import * as dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

const BARD_URL =
  "https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate";
const Secure1PSID = "WAjZ8rIwggZ_d4Vn3yHTX22k0aDzWDCPZlL7Vd4OAv3JUubSWLLGSAo3ldXQFg_EbxP-gA.";
const AT_KEY = "ABi_lZj89y8BilcWw3M9q5kypUb8:1683091283277";
const PROMPT = "job_post : We are looking for a software engineer with experience in Python and machine learning. The candidate should have a strong understanding of data structures and algorithms, and be able to work well in a team environment. resume :I am a software engineer with 5 years of experience. I have extensive experience in Python and machine learning, and have worked on several projects involving data analysis and visualization. I am familiar with a wide range of data structures and algorithms, and have a proven track record of working well in team environments. Generate 5 fair, unbiased, and relevant interview questions for a software engineer position based on the following job post and resume";

const params = new URLSearchParams({
  bl: "boq_assistant-bard-web-server_20230419.00_p1",
  _reqid: Number(Math.random().toString().slice(2, 8)),
  rt: "c",
});

const messageRequest = [[PROMPT], null, ["", "", ""]];

const headers = new Headers();
headers.append("X-Same-Domain", "1");
headers.append(
  "User-Agent",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
);
headers.append(
  "Content-Type",
  "application/x-www-form-urlencoded;charset=UTF-8"
);
headers.append("Sec-Fetch-Site", "same-origin");
headers.append("Sec-Fetch-Mode", "cors");
headers.append("Sec-Fetch-Dest", "empty");
headers.append("Cookie", `__Secure-1PSID=${Secure1PSID};`);

const urlencoded = new URLSearchParams();
urlencoded.append("at", AT_KEY);
urlencoded.append(
  "f.req",
  JSON.stringify([null, JSON.stringify(messageRequest)])
);

const requestOptions = {
  method: "POST",
  headers: headers,
  body: urlencoded,
  redirect: "follow",
};

const request = await fetch(`${BARD_URL}?${params}`, requestOptions);
const response = await request.text();

//console.log(response);

const output = JSON.parse(response.split(/\r?\n/)[3])[0][2];
const content = JSON.parse(output)[0][0];

console.log(content);
