// 登陆页面
import "./login_style.css"
//import {useState} from 'react';
import config from "../config";
//import {useRouter} from "next/router";
import NavigationBar from "@/components/NavigationBar";
import {useState, useEffect} from "react";

interface TotalReport {
  user_id: number,
  created_at: string,
  total_questions: number,
  correct_answers: number,
  duration: string
}

// 
function Report() {
  const [reports, setReports] = useState<TotalReport[]>([]); // 用于存储从 API 获取的报告数据
  const [loading, setLoading] = useState<boolean>(true); // 用于存储加载状态
  const [error, setError] = useState<string | null>(null); // 用于存储错误信息

  // 使用 useEffect 来发起 API 请求
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(config.apiUrl + "/api/get_reports", {
          method: "GET",
          credentials: "include",
        });
        
        // 检查响应是否成功
        if (!response.ok) {
          throw new Error("Failed to fetch reports.");
        }

        const res = await response.json();
        setReports(res); // 更新状态
      } catch (err) {
        setError("Error loading reports: " + err); // 捕获并处理错误
      } finally {
        setLoading(false); // 设置加载状态为 false
      }
    };

    fetchReports(); // 执行 fetch 请求
  }, []); // 空依赖数组表示组件加载时只执行一次

  if (loading) {
    return <div>Loading...</div>; // 加载时显示加载提示
  }

  if (error) {
    return <div>{error}</div>; // 显示错误信息
  }

  return (
    <div style={{backgroundColor:"white", borderRadius:"40px", padding:"40px", marginTop:"20px", height:"400px"}}>
    <p style={{fontSize:"24px"}}>练习记录</p>
      {reports.map((item,index) => (
        <div key={item.total_questions} style={{display:"flex", gap:"100px"}}>
          <div>练习记录 {index + 1}</div>
          <div>总题数 {item.total_questions}</div>
          <div>回答正确题数{item.correct_answers}</div>
          <div>答题时长{item.duration}</div>
          <div>练习时间{item.created_at}</div>
        </div>
      ))}
    </div>
  );
}

function ReportPage() {
  return (
    <div className="body">
      <NavigationBar />
      <Report />
    </div>
  )
}

export default ReportPage;