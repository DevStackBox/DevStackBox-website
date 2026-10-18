import { ImageResponse } from "next/og";
export const alt = "DevStackBox - local PHP development for Windows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",width:"100%",height:"100%",background:"#111b26",color:"#ffffff",padding:"64px"}}>
    <div style={{display:"flex",fontSize:32,color:"#8cafff"}}>DevStackBox / Free & open source</div>
    <div style={{display:"flex",flexDirection:"column",fontSize:58,fontWeight:700,letterSpacing:-2,lineHeight:1.12}}><span>The free XAMPP alternative</span><span style={{color:"#8cafff"}}>for Windows.</span></div>
    <div style={{display:"flex",fontSize:26,color:"#c6d2e3"}}>Apache · PHP · MySQL · phpMyAdmin</div>
  </div>, size);
}
