// 错题集
import InformationBar from "../components/InformationBar";
import NavigationBar from "../components/NavigationBar";
import "./errors_style.css"
import config from "../config"
import { useRouter } from "next/router";
import { useState, useEffect} from "react";

interface Word {
  id: number,
  word: string,
  meaning: string,
  detail: string
}

// 每日一练
function Exercise() {
  const router = useRouter();
  const handleExercise = () => {
    router.push('/answer?pool=all');
  }

  return(
  <div className="exercise" onClick={handleExercise}>
    <p>每日一练</p>
    <p>从错题中随机抽取5道题，检验复习效果</p>
  </div>
  )
}

// 单日题目集
function DailyErrors() {
  const router = useRouter();
  const { set } = router.query;
  const [wordList, setWordList] = useState<Word[] | null>(null);

  useEffect(() => {
    if (!set) {return;}

    const fetchSet = async () => {
      try {
        console.log(config.apiUrl + `/api/get_${set}`);
        const response = await fetch(config.apiUrl + `/api/get_${set}`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();

        setWordList(data);
        console.log("Success to fetch set.");
      } catch (error) {
        console.error("Failed to fetch set.", error);
      }
    }

    fetchSet();
  }, [wordList, set]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(config.apiUrl + "/api/delete", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
        credentials: "include"
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to delete word.", error);
    }
  }

  const handleContextMenu = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    handleDelete(id);
  }

  return(
    <div className="daily_erros">
      <p>{set}</p>
      <div style={{backgroundColor:"#e1e1e1", borderRadius:"20px", padding:"20px"}}>
        <ul style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", listStyleType:"none"}}>
          { wordList ? (
            wordList.map((item) => (
              <li key={item.word} className="word" onContextMenu={(event) => handleContextMenu(event, item.id)}>
                {item.word}
              </li>
            ))
          ) : (
            <p>当前词汇集没有单词</p>
          )}
        </ul>
      </div>
    </div>
  )
}

// 总错题集
function TotalErrors() {
  return (
    <div className="total_errors">
      <DailyErrors />
    </div>
  )
}

function ProblemSetPage() {
  return(
    <div className="body">
      <NavigationBar />
      <div>
        <div style={{display:"flex", flexDirection:"column", width:"1000px"}}>
          <div style={{display:"flex", marginTop:"20px"}}>
            <InformationBar />
          </div>
          <Exercise />
          <TotalErrors />
        </div>
      </div>
    </div>
  )
}

export default ProblemSetPage