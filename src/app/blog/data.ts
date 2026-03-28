// Static blog post data - shared between list and detail pages

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const dummyPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Build a Community-Scale Solar Microgrid',
    excerpt: 'The comprehensive guide to organizing your neighborhood around shared energy and achieving true electrical independence.',
    content: `Building a solar microgrid is one of the most effective ways for a neighborhood to decarbonize and gain energy independence. The process begins with assessing the total roof space and energy consumption of participating households. From there, the community must navigate local zoning laws and secure a grid-tied inverter system that allows for safe islanding during grid outages.

Key steps include forming a legal co-op structure, pooling capital, and selecting a reputable installer. The beauty of a microgrid lies in its shared battery storage, which optimizes self-consumption and provides resilience against extreme weather events.

The economics are compelling: when 20 or more households share a single large installation, the cost per kilowatt-hour drops by 40% compared to individual rooftop systems. Furthermore, bulk purchasing power with grid-scale inverters and established installer relationships results in dramatically better pricing on equipment and labor.

Community engagement is the most underestimated challenge. Monthly town halls, a transparent shared dashboard showing real-time energy production, and a fair credit allocation algorithm are essential to maintaining trust and enthusiasm among participants.`,
    author: 'Aria Green',
    date: 'May 12, 2024',
    readTime: '12 min read',
    category: 'Energy',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Zero-Waste Grocery Stores: A Blueprint for Success',
    excerpt: 'Analyzing the most successful zero-waste retail models and how you can replicate them in your local town or city.',
    content: `The modern grocery store is an engine of plastic waste. However, a new wave of zero-waste retailers is proving that the bulk-bin model can be highly profitable and deeply loved by consumers. The secret lies in streamlined logistics: working directly with local farmers who deliver in reusable crates, and investing in gravity-fed dispensers.

This blueprint covers everything from securing health department approvals for customer-supplied containers to optimizing the store layout for flow and hygiene.

Customer education is paramount. A brief orientation process, simple visual guides at each bin station, and a loyalty system that rewards bringing clean containers all contribute to reducing consumer friction and building a habit loop around zero-waste shopping.

The financial model works: reduced packaging costs offset the higher initial investment in dispensary infrastructure within 18-24 months, while premium pricing on local and organic bulk items provides healthy margins.`,
    author: 'Marcus Bloom',
    date: 'May 08, 2024',
    readTime: '08 min read',
    category: 'Waste',
    image: 'https://images.unsplash.com/photo-1534723452862-4c874018d77d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'The Future of Urban Permaculture',
    excerpt: 'How vertical farming and edible landscaping are transforming concrete jungles into productive, lush ecosystems.',
    content: `Permaculture is not just for sprawling rural acreage. In fact, urban environments offer unique microclimates and massive amounts of waste resources (like coffee grounds and cardboard) that can be harnessed effectively.

By utilizing vertical trellises, rooftop raised beds, and intensive companion planting, concrete jungles can yield surprisingly high harvests. We explore three case studies of urban lots that have been transformed into food forests, proving that high-density living can coexist with ecological abundance.

The key insight from each case study is the same: start with soil biology, not plants. Investing in deep compost, biochar, and mycorrhizal inoculants before planting anything results in dramatically higher yields after the first season.

Water management is the other critical factor. Rain gardens, swales, and strategically placed permeable surfaces dramatically reduce runoff while capturing rainfall for dry-season irrigation.`,
    author: 'Elena Rivers',
    date: 'May 05, 2024',
    readTime: '10 min read',
    category: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Micro-Hydro Projects: Tapping into Small Streams',
    excerpt: 'Small-scale hydroelectric power is becoming a reality for residential use. Here is what you need to know about the technology.',
    content: `For properties with year-round moving water, micro-hydro can provide a much more consistent baseline power than solar or wind. The technology has advanced significantly, with run-of-river systems no longer requiring environmentally damaging dams.

This article breaks down the physics of calculating a stream's head and flow, navigating the complex web of riparian rights, and selecting the right turbine for the job.

Unlike solar which stops generating at night, a well-designed micro-hydro system produces power 24 hours a day, 7 days a week. Even a modest 500-watt system running continuously provides more monthly energy than a 3kW solar array in a temperate climate.

The key regulatory hurdle is the riparian rights permit, which varies dramatically by jurisdiction. Working with a local water rights attorney early in the process can save months of delays and prevent costly redesigns.`,
    author: 'Tom Waters',
    date: 'Apr 28, 2024',
    readTime: '15 min read',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1466611653911-954ffaa13b6f?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Turning Ocean Plastic into 3D Printing Filament',
    excerpt: 'Exploring breakthrough techniques that allow local maker-spaces to directly recycle marine waste into functional filament.',
    content: `Marine plastic pollution is a tragedy, but to a maker, it is also a raw resource. Decentralized recycling ecosystems are emerging where coastal communities harvest PET and High-Density Polyethylene from beaches, wash it, shred it, and extrude it into 3D printing filament.

We dive into the open-source hardware required (like the Precious Plastic shredder) and the precise temperature controls needed to ensure the filament does not snap mid-print.

The quality of recovered ocean plastic filament is now competitive with virgin material for many applications. Surface finish and tensile strength both improve dramatically with proper washing and sorting before the shredding step.

Several coastal collectives have turned this into a viable micro-business, selling certified ocean-recovered filament to designers and manufacturers who need verified environmental credentials for their products.`,
    author: 'Sarah Jenkins',
    date: 'Apr 21, 2024',
    readTime: '06 min read',
    category: 'Recycling',
    image: 'https://images.unsplash.com/photo-1620505876378-d421e428d009?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'The Rise of Electric Cargo Bikes for Last-Mile Delivery',
    excerpt: 'How European cities are replacing diesel delivery vans with agile, zero-emission e-cargo fleets.',
    content: `Last-mile delivery is notoriously inefficient and heavily polluting. E-cargo bikes are solving this by bypassing traffic jams and eliminating tailpipe emissions entirely. We analyze the economics of operating an e-cargo fleet, the modular cargo box designs, and the civic infrastructure needed to make this transition possible.

The business case is now undeniable: in dense urban cores, a single e-cargo bike can complete 50-80% of the deliveries of a diesel van at 20% of the operating cost, including charging, maintenance, and rider wages versus driver wages.

The critical infrastructure piece is the micro-hub: a small, strategically located depot where parcels are consolidated from long-haul trucks and redistributed to cargo bike fleets. These hubs require only a parking space and an electrical connection.

Amsterdam, Utrecht, and Stockholm are the benchmark cities to study. Each has shown that once e-cargo bikes have protected lanes and curb access, modal shift from vans happens organically as the economics become impossible to ignore.`,
    author: 'David Chen',
    date: 'Apr 18, 2024',
    readTime: '09 min read',
    category: 'Transport',
    image: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Regenerative Grazing: Healing the Soil',
    excerpt: 'Why rotating livestock might be our quickest method to returning massive amounts of carbon back into topsoil.',
    content: `Contrary to the narrative that all animal agriculture is inherently destructive, tightly managed rotational grazing mimics the historic movement of wild herds. This process tramples dead plant matter, returning it to the soil profile, and stimulates rapid regrowth which pulls carbon from the atmosphere.

This piece interviews three ranchers who have doubled their soil organic matter in just five years using multi-paddock adaptive grazing techniques.

The science is the fascinating part: when livestock are moved every 1-3 days to fresh paddocks, they never overgraze a single area. The resting paddocks quickly develop deep root systems that sequester carbon and improve water infiltration dramatically.

Allan Savory's controversial but increasingly validated holistic planned grazing framework has real data behind it now. Multiple peer-reviewed studies confirm that properly managed, high-density, time-limited grazing builds topsoil instead of depleting it.`,
    author: 'Elena Rivers',
    date: 'Apr 12, 2024',
    readTime: '14 min read',
    category: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Open Source Hardware for Environmental Monitoring',
    excerpt: 'How cheap microcontroller boards are helping citizens track air quality, water health, and noise pollution globally.',
    content: `Citizen science is undergoing a renaissance thanks to cheap microcontrollers like the ESP32 and Arduino. Communities living near industrial sites no longer have to rely on sparse government sensors; they can build their own mesh networks of particulate matter and VOC sensors for under $50 per node.

We provide a full parts list and code repository links to start your own neighborhood monitoring project.

The Raspberry Pi and ESP32 boards have become the backbone of a grassroots environmental monitoring movement. When hundreds of sensors are deployed in a city grid and their data is publicly available on interactive maps, regulators have a much harder time ignoring chronic pollution events.

The Open Source Hardware Association provides certification for designs that are fully documented for replication. Getting a monitoring device certified massively increases its adoption and the credibility of data it generates in regulatory discussions.`,
    author: "Michael O'Connor",
    date: 'Apr 02, 2024',
    readTime: '11 min read',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Funding Your Green Idea: Grants vs Crowdsourcing',
    excerpt: 'A financial breakdown comparing traditional environmental grants against the speed of community-backed funding.',
    content: `Getting capital for ecological innovation is the biggest bottleneck founders face. While government grants provide non-dilutive capital, the application process can take 12-18 months. Crowdsourcing (like EcoSpark Hub) allows for rapid validation and immediate capital injection.

This deep-dive analyzes when a project should pursue traditional institutional funding versus leaning into grassroots community finance.

The right answer depends almost entirely on the stage of your project. Pre-prototype, community platforms are ideal because they force you to communicate your vision in plain language and get direct market feedback. Post-validation, institutional grants provide the runway needed for longer development cycles.

A hybrid approach is often most effective: launch a community campaign first to prove demand, then use that demonstrated traction as leverage in institutional grant applications. Funders respond very well to evidence that the community already believes in your solution.`,
    author: 'Aria Green',
    date: 'Mar 28, 2024',
    readTime: '07 min read',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'Solar Glass: The Window into Tomorrow',
    excerpt: 'Transparent photovoltaic technology is turning every skyscraper window into a power generator.',
    content: `What if the very windows of our cities could generate electricity? Transparent solar cells are shifting from the lab to commercial viability. By capturing UV and Infrared wavelengths while allowing visible light to pass through, these panes achieve a respectable 5-7% efficiency.

We look at the recent material science breakthroughs making this possible and the immense skyscraper retrofitting market opening up over the next decade.

The breakthrough material is a class of organic photovoltaics and quantum dot systems that can be tuned to absorb specific non-visible wavelengths. Michigan State University demonstrated a fully transparent solar concentrator in 2020 that can be applied to any glass surface.

The building-integrated photovoltaic market is projected to reach $50 billion by 2030. Every new commercial building represents an opportunity to integrate this technology, and retrofit kits for existing curtain wall systems are already in pilot deployment.`,
    author: 'Aria Green',
    date: 'Mar 20, 2024',
    readTime: '10 min read',
    category: 'Energy',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=800&auto=format&fit=crop',
  },
];
