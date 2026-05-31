export interface Project {
  name: string;
  description: string;
  stack: string[];
  code: string;
  codeLink: string;
  demoLink?: string;
  docsLink?: string;
  status?: "in-progress";
}

export const INITIAL_COUNT = 4;

export const projects: Project[] = [
  {
    name: "BLOG_PLATFORM",
    description:
      "Full-stack blog platform with JWT authentication, full-text search, tags, and user profiles. Built with Feature-Sliced Design architecture for scalability, smooth scroll with Lenis, and Zod validation.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Framer Motion",
      "Lenis",
      "Zod",
      "JWT",
    ],
    code: `// Post search with full-text query
const posts = await db.select()
  .from(postsTable)
  .where(
    sql\`to_tsvector('english', 
      postsTable.title || ' ' || postsTable.content)
      @@ to_tsquery('english', \${query})\`
  )
  .orderBy(desc(postsTable.createdAt))
  .limit(20);`,
    codeLink: "https://github.com/an4rky1/retro-games-blog",
    demoLink: "https://retro-games-blog.vercel.app/",
    docsLink: "#",
  },
  {
    name: "PIXEL_ART_CONVERTER",
    description:
      "Image-to-pixel-art converter with customizable settings and user gallery. Features JWT authentication, PostgreSQL database with Drizzle ORM, and Sharp for high-performance image processing.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Sharp",
      "Tailwind CSS",
      "JWT",
    ],
    code: `// Pixel art conversion pipeline
async function convertToPixelArt(
  input: Buffer, 
  pixelSize: number
): Promise<Buffer> {
  const image = sharp(input);
  const { width, height } = await image.metadata();
  
  return image
    .resize(Math.floor(width / pixelSize), 
            Math.floor(height / pixelSize), 
            { kernel: 'nearest' })
    .toBuffer();
}`,
    codeLink: "https://github.com/an4rky1/pixelart-converter",
    demoLink: "https://pixelart-converter-lemon.vercel.app/",
    docsLink: "#",
  },
  {
    name: "NEWS_PLATFORM",
    description:
      "Full-stack news aggregation platform with real-time updates, user authentication, and animated UI. Built with Supabase for backend, React Query for data fetching, and Framer Motion for smooth transitions.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Tailwind CSS 4",
      "React Query",
      "Framer Motion",
      "Zustand",
    ],
    code: `// News feed with real-time subscription
const { data: news } = useQuery({
  queryKey: ['news'],
  queryFn: fetchNews,
});

supabase.channel('news')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'articles' },
    (payload) => addNewArticle(payload.new)
  )
  .subscribe();`,
    codeLink: "https://github.com/an4rky1/news",
    demoLink: "https://news-liart-two.vercel.app/feed",
    docsLink: "#",
  },
  {
    name: "ASCII_TERMINAL",
    description:
      "Interactive Matrix-style terminal for ASCII art generation. Features image-to-ASCII conversion via Canvas API, AI image generation (Hugging Face), bento grid gallery with glitch effects, and Supabase authentication.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Tailwind CSS 4",
      "Zustand",
      "React Query",
    ],
    code: `// Terminal command handler
async function handleCommand(cmd: string) {
  const [action, ...args] = cmd.split(' ');
  
  switch (action) {
    case 'upload':
      return await convertImageToASCII(args[0]);
    case 'generate':
      return await generateFromPrompt(args.join(' '));
    case 'save':
      return await saveToGallery(args[0]);
    case 'gallery':
      return renderGallery();
  }
}`,
    codeLink: "https://github.com/an4rky1/ascii-generator",
    demoLink: "https://ascii-generator-eight.vercel.app/",
    docsLink: "#",
  },
  {
    name: "KANBAN_BOARD",
    description:
      "Real-time drag-and-drop Kanban board with columns and tasks. Supports WebSocket-based live broadcasting via Laravel Reverb when tasks are moved. Features a brutalist/neon aesthetic with thick borders and vibrant colors.",
    stack: [
      "PHP 8.4",
      "Laravel 13",
      "Livewire 4",
      "Alpine.js",
      "Laravel Reverb",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS 4",
    ],
    code: `// Real-time task move broadcasting
class TaskMoved implements ShouldBroadcast
{
    public function __construct(
        public Task $task,
        public Column $from,
        public Column $to,
        public int $newPosition,
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("board.{$this->task->board_id}"),
        ];
    }
}`,
    codeLink: "https://github.com/an4rky1/kanban",
    demoLink: "https://kanban-ehxx.onrender.com",
    docsLink: "#",
  },
  {
    name: "TERMINAL_QUEST",
    description:
      "Text-based RPG styled as a retro hacker terminal. Players navigate rooms via slash-commands, interact with objects, and solve puzzles with persistent state saved to PostgreSQL. Built with Laravel and vanilla JavaScript.",
    stack: [
      "PHP 8.3",
      "Laravel 13",
      "JavaScript",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Docker",
      "Vite",
    ],
    code: `// Room navigation command handler
#[HttpPost('/command')]
public function handle(Request $request) {
    $command = $request->input('command');
    
    return match (true) {
        str_starts_with($command, '/go')   => $this->move($command),
        str_starts_with($command, '/take') => $this->take($command),
        str_starts_with($command, '/use')  => $this->use($command),
        default => ['output' => 'Unknown command'],
    };
}`,
    codeLink: "https://github.com/an4rky1/terminal-quest",
    demoLink: "https://terminal-quest.onrender.com",
    docsLink: "#",
  },
  {
    name: "BRUTAL_THOUGHTS",
    description:
      "Random quote generator with neo-brutalist visual style — thick borders, flat shadows, acid/neon colors, and floating geometric shapes. Users can view random quotes and download them as PNG images.",
    stack: [
      "PHP 8.4",
      "Laravel 13",
      "Alpine.js",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Docker",
      "Vite",
    ],
    code: `// Random quote API endpoint
#[HttpGet('/api/quote/random')]
public function random(): JsonResponse {
    $quote = Quote::inRandomOrder()
        ->whereNotIn('id', session('seen_quotes', []))
        ->first();
    
    if (!$quote) {
        session(['seen_quotes' => []]);
        $quote = Quote::inRandomOrder()->first();
    }
    
    session()->push('seen_quotes', $quote->id);
    return response()->json($quote);
}`,
    codeLink: "https://github.com/an4rky1/brutal",
    demoLink: "https://brutal-38rs.onrender.com",
    docsLink: "#",
  },
  {
    name: "SMART_VCARD",
    description:
      "Digital business card (vCard) generator with custom QR codes. Users fill out a Livewire form to create a vcard with social links and avatar, and get a shareable public profile with stylish QR code that embeds their avatar.",
    stack: [
      "PHP 8.3",
      "Laravel 13",
      "Livewire 4",
      "Alpine.js",
      "Tailwind CSS 4",
      "PostgreSQL",
      "Docker",
    ],
    code: `// QR code generation service
class QrCodeService
{
    public function generate(VCard $vcard): string
    {
        $url = route('card.show', $vcard);
        
        return QrCode::size(300)
            ->format('svg')
            ->gradient(255, 107, 53, 99, 102, 241)
            ->style('rounded')
            ->merge($vcard->avatar_path, 0.3)
            ->generate($url);
    }
}`,
    codeLink: "https://github.com/an4rky1/qr-code-generator",
    demoLink: "https://qr-code-generator-9zoi.onrender.com",
    docsLink: "#",
  },
  {
    name: "RESUME_GENERATOR",
    description:
      "Minimalist resume/card generator inspired by 1960s Swiss poster design. Users fill out a form with bio, skills, and experience, choose from 3 Swiss-inspired templates, and generate print-ready A4 PDFs server-side with WeasyPrint.",
    stack: [
      "Python 3.12",
      "Django 6.0",
      "WeasyPrint",
      "PostgreSQL",
      "Docker",
      "Tailwind CSS",
    ],
    code: `// PDF generation with WeasyPrint
def generate_resume_pdf(resume: Resume) -> bytes:
    template = get_template(resume.template)
    html = template.render({
        'name': resume.name,
        'bio': resume.bio,
        'skills': resume.skills,
        'experience': resume.experience,
    })
    
    doc = HTML(string=html).render()
    return doc.write_pdf(target=f'/tmp/{resume.slug}.pdf')`,
    codeLink: "https://github.com/an4rky1/resume-generator",
    demoLink: "https://resume-generator-ob8d.onrender.com",
    docsLink: "#",
  },
  {
    name: "TAROT_CARD_DAILY",
    description:
      "Interactive daily Tarot card generator with Dark Academia / Gothic aesthetic — deep wine and emerald tones, gold borders, 3D card-flip CSS animations. One draw per day per IP with rate limiting middleware.",
    stack: [
      "Python 3.12",
      "Django 6.0",
      "Alpine.js",
      "Tailwind CSS",
      "Redis",
      "Docker",
    ],
    code: `// Daily tarot draw with rate limiting
@api_view(['GET'])
@throttle(rate='1/day')
def draw_tarot(request):
    card = TarotCard.objects.order_by('?').first()
    reversed = random.choice([True, False])
    
    return Response({
        'name': card.name,
        'meaning': card.reversed_description if reversed 
                   else card.description,
        'reversed': reversed,
        'border': card.border_color,
    })`,
    codeLink: "https://github.com/an4rky1/taro",
    demoLink: "https://taro-14go.onrender.com",
    docsLink: "#",
  },
  {
    name: "CORE_FRAMEWORK",
    description:
      "Core framework and shared libraries for microservices architecture. Built with Nx monorepo, NestJS, Express, and Zod for type-safe contracts. Provides reusable infrastructure drivers and domain modules.",
    stack: [
      "NestJS 11",
      "Nx",
      "TypeScript",
      "Express 5",
      "Zod",
      "RxJS",
      "Jest",
    ],
    status: "in-progress",
    code: `@Injectable()
export class CoreModule {
  constructor(
    private readonly config: ConfigService,
    private readonly grpc: GrpcClient,
    private readonly redis: RedisDriver,
  ) {}

  async initialize(): Promise<void> {
    await this.grpc.connect(this.config.grpc);
    await this.redis.ping();
    this.logger.log('Core services initialized');
  }
}`,
    codeLink: "#",
  },
  {
    name: "SAAS_PLATFORM",
    description:
      "Microservices SaaS platform with GraphQL Federation, gRPC inter-service communication, and CQRS/DDD architecture. Includes auth, user management, API gateway, and Next.js frontend.",
    stack: [
      "NestJS 11",
      "GraphQL Federation",
      "gRPC",
      "CQRS",
      "Apollo Gateway",
      "Bull (Redis)",
      "Drizzle ORM",
      "Next.js",
    ],
    status: "in-progress",
    code: `@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ClientsModule.register([
      { name: 'AUTH_SERVICE', transport: Transport.GRPC },
    ]),
  ],
})
export class ApiGatewayModule {}`,
    codeLink: "#",
  },
];
