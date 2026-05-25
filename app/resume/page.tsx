"use client";

export default function ResumePage() {
  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      lineHeight: 1.5, 
      color: '#1a1a2e',
      backgroundColor: '#fff',
      minHeight: '100vh',
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '30px 40px'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        borderBottom: '2px solid #16213e', 
        paddingBottom: '15px',
        marginBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#16213e', marginBottom: '4px', letterSpacing: '1px' }}>ROMAN IVANOV</h1>
          <p style={{ fontSize: '14px', color: '#0f3460', fontWeight: 500, margin: 0 }}>Fullstack Developer</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#555', lineHeight: 1.8 }}>
          <div>roman.ivanov@email.com</div>
          <div>github.com/romanivanov</div>
          <div>linkedin.com/in/romanivanov</div>
          <div>Remote - Available</div>
        </div>
      </div>

      {/* Summary */}
      <p style={{ 
        fontSize: '13px', 
        color: '#444', 
        lineHeight: 1.6, 
        marginBottom: '20px'
      }}>
        Fullstack developer with 3+ years of experience building scalable web applications. 
        Specialized in backend development with PHP (Laravel, Symfony) and Python (FastAPI, Django), 
        with strong frontend skills in React and Next.js. Passionate about clean code, performance 
        optimization, and distributed systems. Currently exploring Rust and DevOps.
      </p>

      <div style={{ display: 'flex', gap: '25px' }}>
        {/* Left Column */}
        <div style={{ width: '35%' }}>
          {/* Skills */}
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ 
              fontSize: '13px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              color: '#16213e', 
              borderBottom: '1px solid #e0e0e0', 
              paddingBottom: '4px', 
              marginBottom: '10px', 
              fontWeight: 600 
            }}>Technical Skills</h2>
            
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f3460', marginBottom: '2px' }}>Languages</div>
              <div style={{ fontSize: '12px', color: '#444' }}>Python, Go, TypeScript, JavaScript, PHP, SQL, Rust</div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f3460', marginBottom: '2px' }}>Frameworks</div>
              <div style={{ fontSize: '12px', color: '#444' }}>Laravel, Symfony, FastAPI, Django, React, Next.js, Vue.js</div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f3460', marginBottom: '2px' }}>Databases</div>
              <div style={{ fontSize: '12px', color: '#444' }}>PostgreSQL, MySQL, Redis, MongoDB, Elasticsearch</div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#0f3460', marginBottom: '2px' }}>Infrastructure</div>
              <div style={{ fontSize: '12px', color: '#444' }}>Docker, Kubernetes, AWS, GCP, Terraform, CI/CD</div>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ 
              fontSize: '13px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              color: '#16213e', 
              borderBottom: '1px solid #e0e0e0', 
              paddingBottom: '4px', 
              marginBottom: '10px', 
              fontWeight: 600 
            }}>Education</h2>
            
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#16213e' }}>B.Sc. Computer Science</div>
              <div style={{ fontSize: '12px', color: '#0f3460' }}>Donbas State Engineering Academy</div>
              <div style={{ fontSize: '11px', color: '#888' }}>2018 - 2023</div>
            </div>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#16213e' }}>Applied Mathematics</div>
              <div style={{ fontSize: '12px', color: '#0f3460' }}>Horlivka Technical College</div>
              <div style={{ fontSize: '11px', color: '#888' }}>2011 - 2014</div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 style={{ 
              fontSize: '13px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              color: '#16213e', 
              borderBottom: '1px solid #e0e0e0', 
              paddingBottom: '4px', 
              marginBottom: '10px', 
              fontWeight: 600 
            }}>Languages</h2>
            <div style={{ fontSize: '12px', color: '#444', marginBottom: '3px' }}><strong style={{ color: '#16213e' }}>Russian</strong> - Native</div>
            <div style={{ fontSize: '12px', color: '#444', marginBottom: '3px' }}><strong style={{ color: '#16213e' }}>Ukrainian</strong> - Native</div>
            <div style={{ fontSize: '12px', color: '#444' }}><strong style={{ color: '#16213e' }}>English</strong> - Upper Intermediate (B2)</div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: '65%' }}>
          <div style={{ marginBottom: '18px' }}>
            <h2 style={{ 
              fontSize: '13px', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px', 
              color: '#16213e', 
              borderBottom: '1px solid #e0e0e0', 
              paddingBottom: '4px', 
              marginBottom: '10px', 
              fontWeight: 600 
            }}>Work Experience</h2>
            
            {/* Job 1 */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#16213e' }}>Next.js Developer</span>
                <span style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>2024 - Present</span>
              </div>
              <div style={{ fontSize: '12px', color: '#0f3460', fontWeight: 500, marginBottom: '4px' }}>Freelance</div>
              <ul style={{ fontSize: '12px', color: '#444', marginLeft: '16px', marginTop: '4px' }}>
                <li style={{ marginBottom: '2px' }}>Built production React/Next.js applications with TypeScript</li>
                <li style={{ marginBottom: '2px' }}>Implemented SSR and SSG for improved performance and SEO</li>
                <li style={{ marginBottom: '2px' }}>Optimized bundle size and improved Core Web Vitals scores</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#16213e' }}>Laravel Fullstack Developer</span>
                <span style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>2023 - 2024</span>
              </div>
              <div style={{ fontSize: '12px', color: '#0f3460', fontWeight: 500, marginBottom: '4px' }}>CipherTech</div>
              <ul style={{ fontSize: '12px', color: '#444', marginLeft: '16px', marginTop: '4px' }}>
                <li style={{ marginBottom: '2px' }}>Developed RESTful APIs and real-time features with Laravel</li>
                <li style={{ marginBottom: '2px' }}>Integrated Vue.js frontend with Laravel backend</li>
                <li style={{ marginBottom: '2px' }}>Implemented authentication and payment processing systems</li>
              </ul>
            </div>

            {/* Job 3 */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#16213e' }}>Symfony Fullstack Developer</span>
                <span style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>2022 - 2023</span>
              </div>
              <div style={{ fontSize: '12px', color: '#0f3460', fontWeight: 500, marginBottom: '4px' }}>Vertex Labs</div>
              <ul style={{ fontSize: '12px', color: '#444', marginLeft: '16px', marginTop: '4px' }}>
                <li style={{ marginBottom: '2px' }}>Built enterprise applications using Symfony framework</li>
                <li style={{ marginBottom: '2px' }}>Worked with PostgreSQL, Redis, and Elasticsearch</li>
                <li style={{ marginBottom: '2px' }}>Implemented REST APIs and microservices architecture</li>
              </ul>
            </div>

            {/* Job 4 */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#16213e' }}>Frontend Developer</span>
                <span style={{ fontSize: '11px', color: '#888', fontWeight: 500 }}>2021 - 2022</span>
              </div>
              <div style={{ fontSize: '12px', color: '#0f3460', fontWeight: 500, marginBottom: '4px' }}>Freelance</div>
              <ul style={{ fontSize: '12px', color: '#444', marginLeft: '16px', marginTop: '4px' }}>
                <li style={{ marginBottom: '2px' }}>Created responsive websites using HTML, CSS, JavaScript</li>
                <li style={{ marginBottom: '2px' }}>Worked with React.js and Next.js for modern web applications</li>
                <li style={{ marginBottom: '2px' }}>Implemented basic state management with Redux and Context API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
