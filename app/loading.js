export default function Loading() {
  return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060C1E" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:40, height:40, border:"3px solid rgba(59,130,246,0.2)", borderTopColor:"#3B82F6", borderRadius:"50%", margin:"0 auto 12px", animation:"spin 0.8s linear infinite" }}/>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", fontFamily:"system-ui" }}>Loading...</div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}
