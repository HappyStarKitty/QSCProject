// 答题弹窗
import {useModal} from "./ModalContext";
import {useState} from "react";
import {useRouter} from "next/router";


interface AnswerModalProps {
  pool: string
}


function AnswerModal (props: AnswerModalProps) {
  const {isOpen, closeModal} = useModal(); 
  //const data = useModal().data;
  const router = useRouter();
  const [content, setContent] = useState("");

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }

  const handleSubmit = () => {
    router.push(`/answer?pool=${props.pool}&number=${content}`);
  }

  if (!isOpen ) return null;

  return (
    <div>
      <div style={{position:"fixed", top:"0", left:"0", width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,0.4)", zIndex:"999"}}></div>

      <div style={{zIndex:"1200", position:"fixed", left:"40%", top:"40%", backgroundColor:"white", padding:"30px", border:"0px", borderRadius:"20px", width:"190px", display:"flex", flexDirection:"column"}}>
      <p>请输入想学习的单词数</p>
      <div style={{marginBottom:"20px"}}>
        <input placeholder="填空" onChange={handleContentChange} style={{outline:"none", border:"0px", textAlign:"center"}}></input>
      </div>
      <div style={{display:"flex", gap:"80px"}}>
        <button onClick={closeModal} style={{}}>取消</button>
        <button onClick={handleSubmit}>确认</button>
      </div>
    </div>
    </div>
  )
}

export default AnswerModal;