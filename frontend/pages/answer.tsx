// 答题页
import Image from 'next/image'
import "./answer_style.css"
import InformationBar from "../components/InformationBar"
import LinkButton from '@/components/LinkButton'
import config from "../config"
import {useState, useEffect} from "react";
import { useRouter } from 'next/router';
//import {GetServerSideProps} from "next";

// 单词
interface WordResponse {
  id: number;
  word: string;
  meaning: string;
  detail: string;
}

interface OptionsResponse {
  options: string[];
}

interface Question {
  word: WordResponse;
  correctAnswer: string;
  options: string[];
}

interface ReportProps {
  correct: Question[];
  wrong: Question[];
}

// 答题栏
function AnswerBar() {
  const [questions, setQuestions] = useState<Question[]>([]); // 存放本次答题题目
  // const [correctCount, setCorrectCount] = useState(0); // 统计回答正确数量
  const [correctQuestions, setCorrectQuestions] = useState<Question[]>([]); // 存放回答正确题目
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]); // 存放回答错误题目
  const [showResult, setShowResult] = useState(false); // 控制答案显示状态
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // 记录选择选项
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 记录答题进度
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { pool } = router.query;

  const optionsLabels = ["A", "B", "C", "D"];
  const words_total = 5; // 每日一练题目数量

  useEffect(() => {
    if (!pool) return;
    const fetchQuestion = async () => {
      //const { pull } = context.params;

      try {
        // 发送请求
        const [wordResponse, optionsResponse] = await Promise.all([
          fetch(config.apiUrl + `/api/get_word?pool=${pool}`, {
            method: "GET",
            credentials: "include"
          })
          .then((res) => res.json()),
          fetch(config.apiUrl + '/api/get_options', {
            method: "GET",
            credentials: "include"
          })
          .then((res) => res.json())
        ]);

        console.log("Success to fetch word and options.");

        const options = [...optionsResponse, wordResponse.meaning];
        const shuffledOptions = options.sort(() => Math.random() - 0.5); // 选项随机排序

        // 构造question
        const newQuestion: Question = {
          word: wordResponse,
          correctAnswer: wordResponse.meaning,
          options: shuffledOptions
        }

        setQuestions((prev) => [...prev, newQuestion]);
        //setCurrentQuestionIndex(questions.length - 1);
      } catch (error) {
        console.log("Failed to fetch question.", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [questions]);

  if (loading) {
    return (
      <p>少女祈祷中</p>
    )
  }

  // 选择选项后显示答案正误
  const handleOptionClick = (option: string) => {
    setShowResult(true);
    setSelectedOption(option);
    console.log("show result");

    if (option === questions[currentQuestionIndex].correctAnswer) {
      // setCorrectCount((prev) => prev + 1);
      setCorrectQuestions((prev) => [...prev, questions[currentQuestionIndex]]);
    }

    else {
      setWrongQuestions((prev) => [...prev, questions[currentQuestionIndex]]);
    }

    console.log("next question");

    setTimeout(() => {
      setSelectedOption(null);
      setShowResult(false);
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 2000);
  }

    // 完成所有题目后显示答案报告
    if (currentQuestionIndex >= words_total) {
      return <ReportBar correct={correctQuestions} wrong={wrongQuestions}/>
    }

    const currentQuestion: Question = questions[currentQuestionIndex];

    return (
      <div className="answer_bar">
        <>
          <h3>{currentQuestion.word.word}</h3>
          <p>{currentQuestion.word.detail}</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleOptionClick(option)} style={{
                  flex: "display",
                  border: "2px solid black",
                  borderRadius: "20px",
                  width: "400px",
                  marginBottom: "10px",
                  marginTop: "20px",
                  padding: "5px",
                  textAlign: "center",
                  backgroundColor:
                    showResult && option === currentQuestion.correctAnswer
                      ? 'green'
                      : showResult && option === selectedOption
                      ? 'red'
                      : 'transparent' 
                }}>
                  <p>{optionsLabels[index]}. {option}</p>
                </button>
              </li>
            ))}
          </ul> 
          </>
      </div>
    )
  }

// 左栏
function LeftBar() {
  const router = useRouter();

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"220px"}}>
      <ul style={{justifyContent:"center"}}>
        <li>
          <p style={{textAlign:"center"}}>题目集名称</p>
        </li>
        <li>
          <Image src="/figures/logo.png" alt="logo.png" width={120} height={130} style={{marginLeft:"20px"}} />
        </li>
        <li>
          <p style={{textAlign:"center"}}>还需学习</p>
        </li>
        <li>
          <h1 style={{textAlign:"center"}}>10</h1>
        </li>
        <li>
          <div style={{height:"60px"}}>

          </div>
        </li>
        <li>
          <LinkButton imageUrl='figures/icon/history.svg' text="历史记录" clickFun={() => {router.push('/')}} />
        </li>
        <li>
          <LinkButton imageUrl='figures/icon/log_out.svg' text="退出" clickFun={() => {router.push('/')}} />
        </li>
      </ul>
    </div>
  )
}

// 报告栏
function ReportBar({correct, wrong}: ReportProps) {
    return (
      <div className="report_bar">
        <h1 style={{textAlign:"center"}}>学习报告</h1>
        <h4>你已经掌握了：</h4>
        <ul className="word_list">
          {correct.map((correctQuestion) => (
            <li key={correctQuestion.word.word}>
              <p className="word">
                {correctQuestion.word.word}  
              </p> 
            </li>
          ))}
        </ul>

        <h4>你还没完全掌握：</h4>
        <div className="word_list">
          {wrong.map((wrongQuestion) => (
              <p className="word">
                {wrongQuestion.word.word}
              </p>
          ))}
        </div>

        {!wrong.length ? (
          <p>你都掌握了！Good！</p>) : (
            <p>下次再努力吧！</p>
          )
        }
        <h3>记得多多复习，将知识掌握扎实！</h3>

      </div>
    )
}

// 历史记录栏
// TODO:点击 history icon 展开，同时其他部分颜色加深，点击其他地方收回
function HistoryBar() {
  return(
    <div className="left_bar">
      <p style={{color:"black"}}>历史记录</p>
      <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
        <p style={{color:"black"}}>application</p>
        <p style={{color:"black"}}>application</p>
        <p style={{color:"black"}}>application</p>
      </div>
    </div>
  )
}

// TODO:错题收藏功能

function AnswerPage() {
  return(
    <div style={{display:"flex", position:"fixed"}}>
      <LeftBar />
      <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{marginTop:"40px"}}>
          <InformationBar />
        </div>
        <div style={{backgroundColor:"#e1e1e1", padding:"20px", marginTop:"30px"}}>
          <AnswerBar />
        </div>
      </div>
    </div>
  )
}

export default  AnswerPage