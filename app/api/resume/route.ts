import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Roman Ivanov - Resume</title>
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      @page { margin: 15mm 20mm; }
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      max-width: 850px;
      margin: 0 auto;
      padding: 30px 40px;
      color: #1a1a2e;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #16213e;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }
    .header-left h1 {
      font-size: 26px;
      color: #16213e;
      letter-spacing: 1px;
    }
    .header-left p {
      color: #0f3460;
      font-size: 14px;
      margin-top: 4px;
      font-weight: 500;
    }
    .header-right {
      text-align: right;
      font-size: 12px;
      color: #555;
      line-height: 1.8;
    }
    .header-right a {
      color: #0f3460;
      text-decoration: none;
    }
    .main {
      display: flex;
      gap: 25px;
    }
    .left-col {
      width: 35%;
    }
    .right-col {
      width: 65%;
    }
    .section {
      margin-bottom: 18px;
    }
    .section-title {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #16213e;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 4px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .skill-category {
      margin-bottom: 8px;
    }
    .skill-label {
      font-size: 12px;
      font-weight: 600;
      color: #0f3460;
      margin-bottom: 2px;
    }
    .skill-list {
      font-size: 12px;
      color: #444;
    }
    .job {
      margin-bottom: 14px;
    }
    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .job-title {
      font-size: 14px;
      font-weight: 600;
      color: #16213e;
    }
    .job-period {
      font-size: 11px;
      color: #888;
      font-weight: 500;
    }
    .job-company {
      font-size: 12px;
      color: #0f3460;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .job ul {
      font-size: 12px;
      color: #444;
      margin-left: 16px;
      margin-top: 4px;
    }
    .job li {
      margin-bottom: 2px;
    }
    .edu-item {
      margin-bottom: 8px;
    }
    .edu-degree {
      font-size: 13px;
      font-weight: 600;
      color: #16213e;
    }
    .edu-school {
      font-size: 12px;
      color: #0f3460;
    }
    .edu-year {
      font-size: 11px;
      color: #888;
    }
    .lang-item {
      font-size: 12px;
      color: #444;
      margin-bottom: 3px;
    }
    .lang-item strong {
      color: #16213e;
    }
    .summary {
      font-size: 13px;
      color: #444;
      line-height: 1.6;
      margin-bottom: 18px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <h1>ROMAN IVANOV</h1>
      <p>Fullstack Developer</p>
    </div>
    <div class="header-right">
      <div>roman.ivanov@email.com</div>
      <div><a href="https://github.com/romanivanov">github.com/romanivanov</a></div>
      <div><a href="https://linkedin.com/in/romanivanov">linkedin.com/in/romanivanov</a></div>
      <div>Remote - Available</div>
    </div>
  </div>

  <p class="summary">
    Fullstack developer with 3+ years of experience building scalable web applications. 
    Specialized in backend development with PHP (Laravel, Symfony) and Python (FastAPI, Django), 
    with strong frontend skills in React and Next.js. Passionate about clean code, performance 
    optimization, and distributed systems. Currently exploring Rust and DevOps.
  </p>

  <div class="main">
    <div class="left-col">
      <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skill-category">
          <div class="skill-label">Languages</div>
          <div class="skill-list">Python, Go, TypeScript, JavaScript, PHP, SQL, Rust</div>
        </div>
        <div class="skill-category">
          <div class="skill-label">Frameworks</div>
          <div class="skill-list">Laravel, Symfony, FastAPI, Django, React, Next.js, Vue.js</div>
        </div>
        <div class="skill-category">
          <div class="skill-label">Databases</div>
          <div class="skill-list">PostgreSQL, MySQL, Redis, MongoDB, Elasticsearch</div>
        </div>
        <div class="skill-category">
          <div class="skill-label">Infrastructure</div>
          <div class="skill-list">Docker, Kubernetes, AWS, GCP, Terraform, CI/CD</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Education</div>
        <div class="edu-item">
          <div class="edu-degree">B.Sc. Computer Science</div>
          <div class="edu-school">Donbas State Engineering Academy</div>
          <div class="edu-year">2018 - 2023</div>
        </div>
        <div class="edu-item">
          <div class="edu-degree">Applied Mathematics</div>
          <div class="edu-school">Horlivka Technical College</div>
          <div class="edu-year">2011 - 2014</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Languages</div>
        <div class="lang-item"><strong>Russian</strong> - Native</div>
        <div class="lang-item"><strong>Ukrainian</strong> - Native</div>
        <div class="lang-item"><strong>English</strong> - Upper Intermediate (B2)</div>
      </div>
    </div>

    <div class="right-col">
      <div class="section">
        <div class="section-title">Work Experience</div>
        
        <div class="job">
          <div class="job-header">
            <span class="job-title">Next.js Developer</span>
            <span class="job-period">2024 - Present</span>
          </div>
          <div class="job-company">Freelance</div>
          <ul>
            <li>Built production React/Next.js applications with TypeScript</li>
            <li>Implemented SSR and SSG for improved performance and SEO</li>
            <li>Optimized bundle size and improved Core Web Vitals scores</li>
          </ul>
        </div>

        <div class="job">
          <div class="job-header">
            <span class="job-title">Laravel Fullstack Developer</span>
            <span class="job-period">2023 - 2024</span>
          </div>
          <div class="job-company">CipherTech</div>
          <ul>
            <li>Developed RESTful APIs and real-time features with Laravel</li>
            <li>Integrated Vue.js frontend with Laravel backend</li>
            <li>Implemented authentication and payment processing systems</li>
          </ul>
        </div>

        <div class="job">
          <div class="job-header">
            <span class="job-title">Symfony Fullstack Developer</span>
            <span class="job-period">2022 - 2023</span>
          </div>
          <div class="job-company">Vertex Labs</div>
          <ul>
            <li>Built enterprise applications using Symfony framework</li>
            <li>Worked with PostgreSQL, Redis, and Elasticsearch</li>
            <li>Implemented REST APIs and microservices architecture</li>
          </ul>
        </div>

        <div class="job">
          <div class="job-header">
            <span class="job-title">Frontend Developer</span>
            <span class="job-period">2021 - 2022</span>
          </div>
          <div class="job-company">Freelance</div>
          <ul>
            <li>Created responsive websites using HTML, CSS, JavaScript</li>
            <li>Worked with React.js and Next.js for modern web applications</li>
            <li>Implemented basic state management with Redux and Context API</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
