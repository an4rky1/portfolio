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
    }
  </style>
</head>
<body style="font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #222;">
  <div style="text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 25px;">
    <h1 style="font-size: 28px; margin: 0;">ROMAN IVANOV</h1>
    <p style="color: #666; font-size: 14px; margin: 8px 0 0;">roman.ivanov@email.com | github.com/romanivanov | linkedin.com/in/romanivanov</p>
  </div>
  
  <h2 style="font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px;">ABOUT ME</h2>
  <p style="font-size: 14px; text-align: justify;">I am a fullstack developer with 3+ years of experience in building web applications. My main expertise is in PHP (Laravel, Symfony) and JavaScript/TypeScript (React, Next.js). I have a strong background in backend development, API design, and database optimization.</p>
  
  <h2 style="font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px;">TECHNICAL SKILLS</h2>
  <p style="font-size: 14px; margin: 6px 0;"><strong>Languages:</strong> PHP, JavaScript, TypeScript, SQL</p>
  <p style="font-size: 14px; margin: 6px 0;"><strong>Frameworks:</strong> Laravel, Symfony, React, Next.js, Vue.js</p>
  <p style="font-size: 14px; margin: 6px 0;"><strong>Databases:</strong> PostgreSQL, MySQL, Redis, MongoDB</p>
  <p style="font-size: 14px; margin: 6px 0;"><strong>Tools:</strong> Docker, Kubernetes, Git, Linux, AWS</p>
  
  <h2 style="font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px;">WORK EXPERIENCE</h2>
  
  <div style="margin-bottom: 20px;">
    <p style="font-size: 15px; margin: 0; font-weight: bold;">Next.js Developer - Nimbus Systems <span style="color: #888; font-weight: normal;">| 2024 - Present</span></p>
    <ul style="font-size: 13px; margin: 5px 0 0 20px; color: #444;">
      <li>Developed React/Next.js applications with TypeScript</li>
      <li>Implemented SSR and SSG for improved performance</li>
      <li>Optimized bundle size and Core Web Vitals</li>
    </ul>
  </div>
  
  <div style="margin-bottom: 20px;">
    <p style="font-size: 15px; margin: 0; font-weight: bold;">Laravel Fullstack Developer - CipherTech <span style="color: #888; font-weight: normal;">| 2023 - 2024</span></p>
    <ul style="font-size: 13px; margin: 5px 0 0 20px; color: #444;">
      <li>Built RESTful APIs and real-time features with Laravel</li>
      <li>Integrated Vue.js frontend with Laravel backend</li>
      <li>Implemented authentication and payment systems</li>
    </ul>
  </div>
  
  <div style="margin-bottom: 20px;">
    <p style="font-size: 15px; margin: 0; font-weight: bold;">Symfony Fullstack Developer - Vertex Labs <span style="color: #888; font-weight: normal;">| 2022 - 2023</span></p>
    <ul style="font-size: 13px; margin: 5px 0 0 20px; color: #444;">
      <li>Developed enterprise applications using Symfony</li>
      <li>Worked with PostgreSQL, Redis, Elasticsearch</li>
      <li>Implemented REST APIs and microservices</li>
    </ul>
  </div>
  
  <div style="margin-bottom: 20px;">
    <p style="font-size: 15px; margin: 0; font-weight: bold;">Frontend Developer - Freelance <span style="color: #888; font-weight: normal;">| 2021 - 2022</span></p>
    <ul style="font-size: 13px; margin: 5px 0 0 20px; color: #444;">
      <li>Created responsive websites using HTML, CSS, JavaScript</li>
      <li>Worked with React.js and state management</li>
    </ul>
  </div>
  
  <h2 style="font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px;">EDUCATION</h2>
  <p style="font-size: 14px; margin: 6px 0;">Bachelor of Science in Computer Science - Donbas State Engineering Academy (2023)</p>
  <p style="font-size: 14px; margin: 6px 0;">Applied Mathematics - Horlivka Technical College (2014)</p>
  
  <h2 style="font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px;">CERTIFICATIONS</h2>
  <ul style="font-size: 14px; margin-left: 20px;">
    <li>AWS Solutions Architect Associate</li>
    <li>Kubernetes Administrator (CKA)</li>
    <li>Docker Certified Associate</li>
  </ul>
  
  <h2 style="font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 25px;">LANGUAGES</h2>
  <p style="font-size: 14px;">English - Upper Intermediate | Russian - Native | Ukrainian - Native</p>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}