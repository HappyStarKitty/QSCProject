import "./ranking_style.css";
import NavigationBar from "@/components/NavigationBar";
import config from "../config";
import {useState, useEffect} from 'react';
import Image from 'next/image';

interface LoginDays {
  username: string,
  login_days: number
}

interface WordsLearned {
  username: string,
  words_learned: number
}

function DaysRankingBar () {
  const [data, setData] = useState<WordsLearned[] | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(config.apiUrl + "/login_days", {
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
  })

  const sortedData = data ? data.sort((a, b) => a.words_learned - b.words_learned) : data;

  return (
    <div className="ranking_bar">
      <Image src="/figures/icon/ranking.svg" alt="ranking.svg" height={20} width={20} />
      <p>坚持天数排行榜</p>
      <ul>
        {sortedData ? (
          sortedData!.map((item, index) => (
            <li className="ranking_item" key={item.username}>
              <p>{index + 1}</p>
              <p>{item.username}</p>
              <p>{item.words_learned}</p>
            </li>
          )))
      : (<li>没有数据可显示</li>
      )}
      </ul>
    </div>
  )
}

function WordsRankingBar () {
  const [data, setData] = useState<WordsLearned[] | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(config.apiUrl + "/words_learned", {
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
  })

  const sortedData = data ? data.sort((a, b) => a.words_learned - b.words_learned) : data;

  return (
    <div className="ranking_bar">
      <Image src="/figures/icon/ranking.svg" alt="ranking.svg" height={20} width={20} />
      <p>答题道数排行榜</p>
      <ul>
        {sortedData ? (
          sortedData!.map((item, index) => (
            <li className="ranking_item" key={item.username}>
              <p>{index + 1}</p>
              <p>{item.username}</p>
              <p>{item.words_learned}</p>
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
    <div className="body">
      <div>
        <NavigationBar />
        <WordsRankingBar />
        <DaysRankingBar />
      </div>
    </div>
  )
}

export default RankingPage;