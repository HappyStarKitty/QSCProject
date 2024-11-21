// 警告弹窗
import { useModal } from "./ModalContext";
import {useRouter} from "next/router";

function AlertModal() {
  const {isOpen, closeModal} = useModal();
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/");
  }

  if(!isOpen) return null;
  return (
    <div>
      <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,0.4)", zIndex:"999"}}></div>

      <div style={{zIndex:"1200", position:"fixed", left:"40%", top:"40%", backgroundColor:"white", paddingLeft:"20px", paddingRight:"20px", paddingBottom:"10px", border:"0px", borderRadius:"20px", width:"240px", display:"flex", flexDirection:"column"}}>
      <p style={{textAlign:"center", fontSize:"20px"}}>退出?!</p>
      <p style={{textAlign:"center", marginTop:"0px"}}>已学习的单词将不会保存。</p>
      <div style={{display:"flex", gap:"120px", marginLeft:"15px", marginRight:"15px"}}>
        <button onClick={closeModal}>取消</button>
        <button onClick={handleSubmit}>确认</button>
      </div>
      </div>
    </div>
  )
}

export default AlertModal;