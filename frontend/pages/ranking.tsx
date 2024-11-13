import "./ranking_style.css";
import NavigationBar from "@/components/NavigationBar";
import config from "../config";
import {useState, useEffect} from 'react';
import Image from 'next/image';

/*
interface LoginDays {
  username: string,
  login_days: number
}

interface WordsLearned {
  username: string,
  words_learned: number
}
*/

function DaysRankingBar () {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(config.apiUrl + "/api/login_days", {
          method: "GET",
          credentials: "include"
        });
        const res = await response.json();
        setData(res);
      } catch (error) {
      console.error("Faile to fetch days login data.", error);
      }
    }

    fetchWords();
  }, [])

  return (
    <div className="ranking_bar">
      <div style={{display:"flex", alignItems:"center"}}>
        <Image src="/figures/icon/ranking.svg" alt="ranking.svg" height={40} width={40} />
        <p style={{fontSize:"16px", marginLeft:"20px"}}>坚持天数排行榜</p>
      </div>
      <ul style={{listStyleType:"none"}}>
        {data ? (
          data!.map((item, index) => (
            <li className="ranking_item" key={`days${item.login_days}`}>
              <div style={{display:"flex", gap:"80px"}}>
                <div style={{width:"50px"}}>
                  <p>{index + 1}</p>
                </div>
                <div style={{width:"100px"}}>
                  <p>{item[0]}</p>
                </div>
                <div style={{width:"100px"}}>
                  <p>{item[1]}天</p>
                </div>
              </div>
            </li>
          )))
      : (<li>没有数据可显示</li>
      )}
      </ul>
    </div>
  )
}

function WordsRankingBar () {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(config.apiUrl + "/api/words_learned", {
          method: "GET",
          credentials: "include"
        });
        const res = await response.json();
        setData(res);
      } catch (error) {
      console.error("Faile to fetch words leanrned data.", error);
      }
    }

    fetchWords();
  },[])

  return (
    <div className="ranking_bar">
      <div style={{display:"flex", alignItems:"center"}}>
        <Image src="/figures/icon/ranking.svg" alt="ranking.svg" height={40} width={40} />
        <p style={{marginLeft:"20px"}}>答题道数排行榜</p>
      </div>
      <ul style={{listStyleType:"none"}}>
        {data ? (
          data!.map((item, index) => (
            <li className="ranking_item" key={`words${index}`}>
              <div style={{display:"flex", gap:"80px"}}>
                <div style={{width:"50px"}}>
                  <p>{index + 1}</p>
                </div>
                <div style={{width:"100px"}}>
                  <p>{item[0]}</p>
                </div>
                <div style={{width:"100px"}}>
                  <p>{item[1]}道</p>
                </div>
              </div>
            </li>
          )))
      : (<li>没有数据可显示</li>
      )}
      </ul>
    </div>
  )
}

function RankingPage () {
  return (
    <div>
      <div className="body">
        <NavigationBar />
        <div style={{display:"flex", gap:"50px", marginTop:"40px", marginLeft:"20px"}}>
          <WordsRankingBar />
          <DaysRankingBar />
        </div>
      </div>
    </div>
  )
}

export default RankingPage;