"use client";

export default function ResumePage() {
  return (
    <div style={{ 
      fontFamily: 'Georgia, Times New Roman, serif', 
      lineHeight: 1.5, 
      color: '#222',
      backgroundColor: '#fff',
      minHeight: '100vh',
      maxWidth: '850px', 
      margin: '0 auto', 
      padding: '45px 50px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#000', marginBottom: '8px', letterSpacing: '1px' }}>ROMAN IVANOV</h1>
        <div style={{ fontSize: '15px', color: '#555' }}>
          <span>roman.ivanov@email.com</span>
          <span style={{ margin: '0 10px' }}>|</span>
          <span>github.com/romanivanov</span>
          <span style={{ margin: '0 10px' }}>|</span>
          <span>linkedin.com/in/romanivanov</span>
        </div>
      </div>

      {/* About */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>About Me</h2>
        <p style={{ fontSize: '15px', color: '#333', textAlign: 'justify' }}>
          I am a fullstack developer with 3+ years of experience in building web applications. 
          My main expertise is in PHP (Laravel, Symfony) and JavaScript/TypeScript (React, Next.js). 
          I have a strong background in backend development, API design, and database optimization. 
          I enjoy writing clean, maintainable code and solving complex problems. I am constantly learning 
          new technologies and improving my skills. Currently, I am exploring Rust and DevOps practices.
          I am a reliable and dedicated professional who takes pride in delivering quality work on time.
        </p>
      </div>

      {/* Summary */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Summary</h2>
        <p style={{ fontSize: '15px', color: '#333' }}>
          Fullstack developer with 3+ years of experience in building web applications. 
          Proficient in PHP (Laravel, Symfony), JavaScript/TypeScript (React, Next.js), and modern databases. 
          Strong focus on backend development, API design, and clean code practices.
          Experienced in working with both small teams and large projects. 
          Looking for opportunities to contribute to interesting projects and grow professionally.
        </p>
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Technical Skills</h2>
        <div style={{ fontSize: '15px', color: '#333' }}>
          <p style={{ marginBottom: '6px' }}><strong>Languages:</strong> PHP, JavaScript, TypeScript, SQL, HTML, CSS</p>
          <p style={{ marginBottom: '6px' }}><strong>Frameworks:</strong> Laravel, Symfony, React, Next.js, Vue.js, FastAPI, Django</p>
          <p style={{ marginBottom: '6px' }}><strong>Databases:</strong> PostgreSQL, MySQL, Redis, MongoDB, Elasticsearch</p>
          <p style={{ marginBottom: '6px' }}><strong>Tools & Technologies:</strong> Docker, Kubernetes, Git, Linux, AWS, CI/CD, Nginx, Apache</p>
          <p style={{ marginBottom: '6px' }}><strong>Methodologies:</strong> Agile, Scrum, Gitflow, REST API Design, Microservices</p>
        </div>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Work Experience</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>Next.js Developer</div>
            <div style={{ fontSize: '16px', color: '#666' }}>2024 - Present</div>
          </div>
          <div style={{ fontSize: '15px', color: '#444', fontStyle: 'italic', marginBottom: '6px' }}>Nimbus Systems</div>
          <ul style={{ fontSize: '16px', color: '#444', marginLeft: '16px' }}>
            <li>Developed and maintained production React/Next.js applications with TypeScript</li>
            <li>Implemented server-side rendering (SSR) and static site generation (SSG) for improved performance and SEO</li>
            <li>Optimized bundle size and improved Core Web Vitals scores</li>
            <li>Worked with REST and GraphQL APIs</li>
            <li>Collaborated with designers to implement responsive and accessible UI</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>Laravel Fullstack Developer</div>
            <div style={{ fontSize: '16px', color: '#666' }}>2023 - 2024</div>
          </div>
          <div style={{ fontSize: '15px', color: '#444', fontStyle: 'italic', marginBottom: '6px' }}>CipherTech</div>
          <ul style={{ fontSize: '16px', color: '#444', marginLeft: '16px' }}>
            <li>Built RESTful APIs and real-time features using Laravel and WebSockets</li>
            <li>Integrated Vue.js frontend with Laravel backend</li>
            <li>Implemented secure authentication and payment systems</li>
            <li>Optimized database queries and implemented caching with Redis</li>
            <li>Worked on e-commerce solutions and payment integrations</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>Symfony Fullstack Developer</div>
            <div style={{ fontSize: '16px', color: '#666' }}>2022 - 2023</div>
          </div>
          <div style={{ fontSize: '15px', color: '#444', fontStyle: 'italic', marginBottom: '6px' }}>Vertex Labs</div>
          <ul style={{ fontSize: '16px', color: '#444', marginLeft: '16px' }}>
            <li>Developed enterprise-level applications using Symfony framework</li>
            <li>Worked with PostgreSQL, Redis, and Elasticsearch for data management</li>
            <li>Implemented REST APIs and microservices architecture</li>
            <li>Created automated testing pipelines and CI/CD workflows</li>
            <li>Mentored junior developers and participated in code reviews</li>
          </ul>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>Frontend Developer</div>
            <div style={{ fontSize: '16px', color: '#666' }}>2021 - 2022</div>
          </div>
          <div style={{ fontSize: '15px', color: '#444', fontStyle: 'italic', marginBottom: '6px' }}>Freelance</div>
          <ul style={{ fontSize: '16px', color: '#444', marginLeft: '16px' }}>
            <li>Created responsive websites using HTML, CSS, JavaScript</li>
            <li>Worked with React.js and basic state management (Redux, Context API)</li>
            <li>Collaborated with designers to implement pixel-perfect UI/UX</li>
            <li>Developed custom WordPress themes and plugins</li>
            <li>Managed client relationships and project timelines</li>
          </ul>
        </div>
      </div>

      {/* Projects */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Notable Projects</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#000' }}>E-commerce Platform</div>
          <p style={{ fontSize: '16px', color: '#444', marginBottom: '4px' }}>Full-stack Laravel + Vue.js application with payment processing, inventory management, and admin dashboard</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#000' }}>Real-time Analytics Dashboard</div>
          <p style={{ fontSize: '16px', color: '#444', marginBottom: '4px' }}>Next.js + FastAPI application with WebSocket updates, data visualization, and report generation</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#000' }}> REST API Gateway</div>
          <p style={{ fontSize: '16px', color: '#444', marginBottom: '4px' }}>Custom API gateway with rate limiting, authentication, and request routing built with Node.js</p>
        </div>
      </div>

      {/* Education */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Education</h2>
        
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#000' }}>Bachelor of Science in Computer Science</div>
            <div style={{ fontSize: '16px', color: '#666' }}>2023</div>
          </div>
          <div style={{ fontSize: '15px', color: '#444' }}>Donbas State Engineering Academy</div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#000' }}>Applied Mathematics</div>
            <div style={{ fontSize: '16px', color: '#666' }}>2014</div>
          </div>
          <div style={{ fontSize: '15px', color: '#444' }}>Horlivka Technical College of Donetsk National University</div>
        </div>
      </div>

      {/* Certifications */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Certifications</h2>
        <ul style={{ fontSize: '15px', color: '#444', marginLeft: '16px' }}>
          <li>AWS Solutions Architect Associate</li>
          <li>Kubernetes Administrator (CKA)</li>
          <li>Docker Certified Associate</li>
        </ul>
      </div>

      {/* Languages */}
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', borderBottom: '1px solid #ccc', paddingBottom: '6px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Languages</h2>
        <p style={{ fontSize: '15px', color: '#444' }}>English - Upper Intermediate | Russian - Native | Ukrainian - Native</p>
      </div>
    </div>
  );
}