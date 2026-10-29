export interface ProjectMetric {
  value: string
  label: string
}

export interface ArchitectureItem {
  title: string
  description: string
}

export interface Project {
  id: string
  title: string
  shortTitle: string
  discipline: string
  year: string
  summary: string
  overview: string
  stack: string[]
  metrics: ProjectMetric[]
  architecture: ArchitectureItem[]
  repo?: string
  repoLabel?: string
}

export const projects: Project[] = [
  {
    id: 'seed-bank',
    title: 'Seed Bank — Seed Quality Classification',
    shortTitle: 'Seed Bank',
    discipline: 'Computer vision · Graduation project',
    year: '2025—2026',
    summary: 'Dual detection pipelines and synthetic data for precise seed-defect classification.',
    overview: 'A computer vision platform that detects, counts, and classifies individual seed quality and defects from top-down images. The system balances a real-time detection path with a high-accuracy two-stage pipeline.',
    stack: ['PyTorch', 'YOLOv8', 'Faster R-CNN', 'EfficientNet-B2', 'U2-Net', 'Synthetic Data Generation'],
    metrics: [
      { value: '97.47%', label: 'Maize defect classification accuracy' },
      { value: '96.89%', label: 'F1 score' },
      { value: '02', label: 'Complementary vision pipelines' },
    ],
    architecture: [
      { title: 'Dual inference paths', description: 'YOLOv8 provides single-stage, real-time inference, while a modified Faster R-CNN with EfficientNet-B2 targets high-accuracy defect classification.' },
      { title: 'Contour isolation', description: 'U2-Net segmentation runs on Faster R-CNN crops to remove background noise and isolate seed contours before classification.' },
      { title: 'MultiSeedGen', description: 'A synthetic data engine addresses bias and scarcity through domain randomization, clutter, occlusion, shadows, camera noise, and scaling.' },
      { title: 'Model governance', description: 'A registry and benchmarking workflow versions, evaluates, and archives candidates against a fixed baseline before production promotion.' },
    ],
    repo: 'https://github.com/RealOrangeKun/seed-bank',
    repoLabel: 'View team repository',
  },
  {
    id: 'local-research',
    title: 'Local RAG AI Agent for Research',
    shortTitle: 'Local Research Agent',
    discipline: 'Agentic AI · Retrieval systems',
    year: '2026',
    summary: 'A cited, local-first research agent with adaptive hybrid retrieval and Fast/Deep profiles.',
    overview: 'An evidence-led research agent over an O’Reilly AI book collection. Local Qwen 3.5-4B inference keeps the core workflow private and offline, with optional Tavily search for out-of-corpus questions.',
    stack: ['LangGraph', 'Ollama', 'Qwen 3.5-4B', 'ChromaDB', 'BM25', 'BGE Embeddings', 'Streamlit', 'Tavily'],
    metrics: [
      { value: '100%', label: 'Hit@6 and Recall@6 across 20 queries' },
      { value: '0.95', label: 'Mean reciprocal rank' },
      { value: '~40', label: 'Tokens/sec at an 8K context window' },
    ],
    architecture: [
      { title: 'Agentic retrieval graph', description: 'Fast and Deep profiles coordinate query expansion, hybrid BM25 + ChromaDB retrieval, relevance grading, adaptive rewrites, and cited synthesis.' },
      { title: 'Evidence ledger', description: 'Answers retain book-page or web provenance, while live graph-step progress makes each research cycle legible in Streamlit.' },
      { title: 'Local optimization', description: 'CPU-based BGE embeddings, persistent indexes, reciprocal-rank fusion, batched generation, model keep-alive, and caching reduce latency.' },
      { title: 'Bounded conversation', description: 'The latest four completed turns guide follow-up questions without allowing conversation context to grow without limit.' },
    ],
    repo: 'https://github.com/amroosha/Local-Research-Agent',
  },
  {
    id: 'advanced-rag',
    title: 'Advanced RAG Architectures',
    shortTitle: 'Advanced RAG',
    discipline: 'Information retrieval · LLM systems',
    year: '2026',
    summary: 'A working atlas of query transformation, indexing, routing, and corrective retrieval methods.',
    overview: 'An applied exploration of advanced retrieval-augmented generation patterns, organized as reproducible notes and implementations for designing more resilient LLM systems.',
    stack: ['LangChain', 'ChromaDB', 'BGE v1.5', 'Hugging Face', 'LangChain-Groq', 'RAPTOR', 'ColBERT'],
    metrics: [
      { value: '04', label: 'Query translation strategies' },
      { value: '03', label: 'Corrective retrieval methods' },
      { value: '02', label: 'Structured query construction paths' },
    ],
    architecture: [
      { title: 'Query processing', description: 'Implements Multi-query, RAG-Fusion, Step-back, and HyDE translation, plus semantic and logical routing.' },
      { title: 'Query construction', description: 'Text-to-SQL and Text-to-Cypher paths translate natural language into structured retrieval.' },
      { title: 'Indexing and representation', description: 'Chunk optimization, RAPTOR multi-representation indexing, and ColBERT specialized embeddings improve retrieval coverage.' },
      { title: 'Retrieval refinement', description: 'Re-ranking, CRAG, and Self-RAG introduce corrective and self-reflective retrieval behavior.' },
    ],
    repo: 'https://github.com/amroosha/AI-Atlas/tree/main/RAG',
    repoLabel: 'Explore the RAG atlas',
  },
  {
    id: 'voice-classification',
    title: 'Voice Gender Classification Microservice',
    shortTitle: 'Voice Classification',
    discipline: 'Speech ML · Production inference',
    year: '2026',
    summary: 'Frozen Wav2Vec 2.0 representations served through a resilient, low-latency FastAPI pipeline.',
    overview: 'A production-minded speech classification service that transforms raw waveforms into self-supervised transformer representations, then classifies them with a calibrated, efficient logistic-regression pipeline.',
    stack: ['Wav2Vec 2.0', 'Scikit-learn', 'FastAPI', 'MLflow', 'Docker', 'AWS EC2'],
    metrics: [
      { value: '99.2%', label: 'Out-of-distribution accuracy on FLEURS' },
      { value: '~45ms', label: 'CPU inference latency' },
      { value: '100%', label: 'In-distribution validation accuracy' },
    ],
    architecture: [
      { title: 'Representation learning', description: 'A frozen Wav2Vec 2.0 backbone extracts Layer 6 hidden states, mean-pooled into a standardized 768-dimensional feature vector.' },
      { title: 'Resilient ingestion', description: 'In-memory decoding, mono downmixing, 16 kHz resampling, duration checks, and multi-tier decoder fallbacks sanitize diverse audio uploads.' },
      { title: 'Efficient classification', description: 'StandardScaler and cost-sensitive logistic regression provide interpretable predictions without fine-tuning the 95M-parameter backbone.' },
      { title: 'Production serving', description: 'Asynchronous FastAPI contracts, lifespan model loading, MLflow tracking, health checks, and a multi-stage Docker build support reproducible deployment.' },
    ],
    repo: 'https://github.com/amroosha/Voice-Gender-Classification-Model',
  },
  {
    id: 'rock-loyalty',
    title: 'Rock Loyalty System',
    shortTitle: 'Rock Loyalty',
    discipline: 'Frontend architecture · Security',
    year: '2025',
    summary: 'A multi-tenant loyalty platform with secure authentication and fine-grained access control.',
    overview: 'An Angular 18 frontend for a multi-tenant restaurant loyalty platform, spanning a customer points-and-vouchers portal and an administrative interface for restaurant management.',
    stack: ['Angular 18', 'TypeScript', 'RxJS', 'JWT', 'OAuth2'],
    metrics: [
      { value: '04', label: 'Functional route guards' },
      { value: '01', label: 'Build serving multiple restaurant tenants' },
      { value: '02', label: 'Customer and admin experiences' },
    ],
    architecture: [
      { title: 'Secure session flow', description: 'In-memory access tokens pair with HTTP-only refresh cookies, proactive silent refresh, and automatic logout on expiry.' },
      { title: 'Identity journeys', description: 'Google OAuth2 social login joins complete email-confirmation and forgot-password flows.' },
      { title: 'Multi-tenant routing', description: 'A /:restaurantId architecture lets one deployed build serve multiple restaurant clients.' },
      { title: 'Reactive access control', description: 'Functional interceptors inject Bearer and API-key credentials, four guards control access, and RxJS BehaviorSubject manages session state.' },
    ],
  },
]

export const skillGroups = [
  { title: 'Machine Learning & Computer Vision', skills: 'PyTorch · TensorFlow · Scikit-learn · OpenCV · YOLO · ONNX · U2-Net · Faster R-CNN · Wav2Vec2' },
  { title: 'LLM & MLOps', skills: 'LangChain · LangGraph · LangSmith · ChromaDB · Sentence Transformers · BM25 · Ollama · llama.cpp · MLflow · Docker · AWS' },
  { title: 'Data Science & Analysis', skills: 'NumPy · Pandas · Matplotlib · Seaborn' },
  { title: 'Backend & Core Engineering', skills: 'System Design · REST APIs · PostgreSQL · OOP · Data Structures & Algorithms' },
  { title: 'Programming Languages', skills: 'Python · C++ · SQL · Java · Dart · JavaScript / TypeScript' },
]
