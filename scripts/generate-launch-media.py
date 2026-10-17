"""Generate first-pass DevStackBox launch graphics from the repo's real UI screenshot and logo."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import cairosvg
import io

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public"
APP = Path(r"C:\xampp\htdocs\DevStackBox")
SOURCE = PUB / "screenshots" / "app" / "dashboard-light-1536x912.png"
LOGO = APP / "public" / "logo.svg"
OUT_OG = PUB / "og"
OUT_PH = PUB / "product-hunt"
OUT_BRAND = PUB / "brand"
OUT_MEDIA = PUB / "media"
OUT_APP = PUB / "screenshots" / "app"
for folder in (OUT_OG, OUT_PH, OUT_BRAND, OUT_MEDIA, OUT_APP):
    folder.mkdir(parents=True, exist_ok=True)

NAVY = "#111923"
PANEL = "#192431"
BLUE = "#2463eb"
PALE = "#eaf0fa"
WHITE = "#ffffff"
MUTED = "#afbdce"

def font(size, bold=False):
    choices = [r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
               r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf"]
    for path in choices:
        if Path(path).exists(): return ImageFont.truetype(path, size)
    return ImageFont.load_default()

def logo_png(size):
    raw = cairosvg.svg2png(url=str(LOGO), output_width=size, output_height=size)
    return Image.open(io.BytesIO(raw)).convert("RGBA")

logo_png(512).save(OUT_BRAND / "devstackbox-logo-512.png")
logo_png(1024).save(OUT_BRAND / "devstackbox-logo-1024.png")
screen = Image.open(SOURCE).convert("RGB")

def cover(im, size):
    w,h=size; ratio=max(w/im.width,h/im.height)
    im=im.resize((round(im.width*ratio),round(im.height*ratio)),Image.Resampling.LANCZOS)
    x=(im.width-w)//2; y=(im.height-h)//2
    return im.crop((x,y,x+w,y+h))

def rounded(im, radius=18):
    mask=Image.new("L",im.size,0); ImageDraw.Draw(mask).rounded_rectangle((0,0,*im.size),radius=radius,fill=255)
    out=Image.new("RGBA",im.size,(0,0,0,0)); out.paste(im,(0,0)); out.putalpha(mask); return out

def card(headline, sub, out, size=(1200,630), tag="LOCAL PHP DEVELOPMENT"):
    w,h=size
    canvas=Image.new("RGB",size,NAVY); d=ImageDraw.Draw(canvas)
    # restrained blue light behind the actual app capture
    glow=Image.new("RGBA",size,(0,0,0,0)); gd=ImageDraw.Draw(glow)
    gd.ellipse((w-650,-170,w+120,650),fill=(36,99,235,38)); glow=glow.filter(ImageFilter.GaussianBlur(42))
    canvas=Image.alpha_composite(canvas.convert("RGBA"),glow)
    d=ImageDraw.Draw(canvas)
    mark=logo_png(48); canvas.alpha_composite(mark,(62,48)); d=ImageDraw.Draw(canvas)
    d.text((122,55),"DevStackBox",font=font(26,True),fill=WHITE)
    d.rounded_rectangle((62,139,340,176),radius=18,fill="#1b2b45")
    d.text((78,148),tag,font=font(14,True),fill="#9bbcff")
    d.text((62,204),headline,font=font(41,True),fill=WHITE,spacing=8)
    d.text((64,316),sub,font=font(20),fill=MUTED,spacing=8)
    # Embed the genuine product screenshot, including its visible state and version labels.
    sw,sh=500,263
    shot=rounded(cover(screen,(sw,sh)),12)
    shadow=Image.new("RGBA",(sw+36,sh+36),(0,0,0,0)); ImageDraw.Draw(shadow).rounded_rectangle((10,12,sw+24,sh+24),radius=18,fill=(0,0,0,140)); shadow=shadow.filter(ImageFilter.GaussianBlur(12))
    canvas.alpha_composite(shadow,(w-sw-56,174)); canvas.alpha_composite(shot,(w-sw-48,166))
    d=ImageDraw.Draw(canvas)
    d.text((64,h-70),"Manage Apache · MySQL · PHP in one place",font=font(17,True),fill="#d5dfeb")
    canvas.convert("RGB").save(out,quality=95)

og = [
 ("home.png","Local PHP development,\nready in minutes","Apache, MySQL and PHP in one Windows app.\nSwitch PHP versions and manage projects locally.","WINDOWS DEVELOPMENT STACK"),
 ("download.png","Download DevStackBox\nfor Windows","Free and open source. Apache 2.4.65, MySQL 8.4.11 LTS\nand PHP 8.3.31 included.","FREE · OPEN SOURCE · WINDOWS"),
 ("xampp-alternative.png","A free XAMPP\nalternative for Windows","A modern desktop app for Apache, MySQL, PHP\nand local projects.","XAMPP ALTERNATIVE"),
 ("migrate-from-xampp.png","Move your local projects\nfrom XAMPP","Bring your existing projects into a focused\nWindows development workspace.","MIGRATE FROM XAMPP"),
 ("vs-laragon.png","Compare DevStackBox\nand Laragon","See the included stack versions and tools\nat a glance.","STACK COMPARISON"),
 ("vs-herd.png","A local PHP stack\nfor Windows","Manage Apache, MySQL and PHP from\none desktop dashboard.","DEVSTACKBOX"),
]
for name,title,sub,tag in og: card(title,sub,OUT_OG/name,tag=tag)

# Product Hunt thumbnail with a clean transparent brand mark.
thumb=Image.new("RGBA",(240,240),NAVY); mark=logo_png(170); thumb.alpha_composite(mark,(35,20))
ImageDraw.Draw(thumb).text((25,198),"DevStackBox",font=font(20,True),fill=WHITE)
thumb.convert("RGB").save(OUT_PH/"thumbnail-240.png")

# Five gallery-ready slides, 1270x760, based on the same real product dashboard.
slides=[
 ("01-hero.png","Your local PHP stack,\nunder one roof","Apache · MySQL · PHP · phpMyAdmin"),
 ("02-php-versions.png","Switch PHP versions\nfrom the app","PHP 8.1–8.5 available on demand"),
 ("03-xampp-import.png","Bring your XAMPP\nprojects along","A guided path into DevStackBox"),
 ("04-stack-facts.png","A complete stack\nfor Windows","Apache 2.4.65 · MySQL 8.4.11 LTS · PHP 8.3.31"),
 ("05-hindi-ui.png","Built for developers\nwho work in Hindi","Hindi interface available"),
]
for name,title,sub in slides: card(title,sub,OUT_PH/name,size=(1270,760),tag="PRODUCT HUNT · DEVSTACKBOX")

# Compact loop of genuine app screenshots. This is a feature tour, not a recorded install workflow.
tour_names = [
    "dashboard-light-1536x912.png",
    "php-versions-dark-1202x831.png",
    "php-85-download-1202x831.png",
    "php-85-active-dark-1202x831.png",
    "php-ini-config-dark-1202x831.png",
    "xampp-import-wizard-dark-1202x831.png",
    "dashboard-hi-dark-1202x831.png",
    "logs-apache-light-1202x831.png",
    "terminal-light-1202x831.png",
]
frames=[]
for name in tour_names:
    frame=cover(Image.open(OUT_APP/name).convert("RGB"),(960,664))
    frames.append(frame.quantize(colors=128,method=Image.Quantize.MEDIANCUT))
frames[0].save(OUT_MEDIA/"feature-tour.gif",save_all=True,append_images=frames[1:],duration=1400,loop=0,optimize=True,disposal=2)

# Comparison graphic keeps competitor claims factual and limited to the included DevStackBox facts.
w,h=1200,630; im=Image.new("RGB",(w,h),NAVY); d=ImageDraw.Draw(im)
d.text((56,44),"Local PHP stacks for Windows",font=font(35,True),fill=WHITE)
d.text((58,96),"A quick look at what DevStackBox includes",font=font(19),fill=MUTED)
cols=[("DevStackBox",BLUE,["Apache 2.4.65","MySQL 8.4.11 LTS","PHP 8.3.31 included","PHP 8.1–8.5 on demand","Desktop dashboard"]),("XAMPP","#253343",["Apache · MariaDB · PHP","phpMyAdmin","Long-running ecosystem","Existing projects supported","Windows package"]),("Laragon","#253343",["Local development stack","Apache / Nginx options","Database and PHP tools","Project workflows","Windows focused"])]
for i,(name,color,items) in enumerate(cols):
 x=56+i*372; d.rounded_rectangle((x,157,x+350,557),radius=18,fill=color)
 d.text((x+22,181),name,font=font(25,True),fill=WHITE)
 for j,item in enumerate(items):
  yy=239+j*58; d.ellipse((x+23,yy+7,x+35,yy+19),fill="#8fb3ff" if i==0 else "#64748b")
  d.text((x+48,yy),item,font=font(16, i==0),fill=WHITE if i==0 else "#d5dfeb")
d.text((58,584),"DevStackBox versions shown from the repository's current bundled stack metadata.",font=font(14),fill=MUTED)
im.save(OUT_MEDIA/"devstackbox-vs-xampp-vs-laragon-1200x630.png")

# GitHub preview has the recommended 2:1 ratio. YouTube thumbnail has 16:9.
card("Local PHP development\nfor Windows","Apache, MySQL and PHP in one desktop app.\nMIT licensed · Free and open source.",APP/".github"/"social-preview.png",size=(1280,640),tag="DEVSTACKBOX · WINDOWS PHP STACK")
card("DevStackBox in 60 seconds","Install · start services · switch PHP · open localhost",OUT_MEDIA/"youtube-thumbnail-1280x720.png",size=(1280,720),tag="DEMO · HINGLISH / NO VOICE")

print("Generated:")
for folder in (OUT_APP,OUT_BRAND,OUT_OG,OUT_PH,OUT_MEDIA,APP/".github"):
 for p in sorted(folder.glob("*.png")): print(f"{p} ({Image.open(p).size[0]}x{Image.open(p).size[1]})")
