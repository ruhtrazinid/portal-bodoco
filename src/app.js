const HYGRAPH_ENDPOINT = 'https://us-west-2.cdn.hygraph.com/content/cmtup25dl011107v1w3cuwi71/master';

const search = document.querySelector('#news-search');
let cards = [...document.querySelectorAll('.news-card')];
const filters = [...document.querySelectorAll('.filter-button')];
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const newsGrid = document.querySelector('#news-grid');
let activeFilter = 'Todos';

const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function applyFilters() {
  const term = normalize(search.value.trim());
  let visible = 0;
  cards.forEach((card) => {
    const categoryMatch = activeFilter === 'Todos' || card.dataset.category === activeFilter;
    const textMatch = !term || normalize(`${card.dataset.title} ${card.textContent}`).includes(term);
    card.hidden = !(categoryMatch && textMatch);
    if (!card.hidden) visible += 1;
  });
  if (resultCount) resultCount.textContent = visible;
  const statusContainer = document.querySelector('.results-status');
  if (statusContainer && statusContainer.lastChild) {
    statusContainer.lastChild.textContent = visible === 1 ? ' matéria encontrada' : ' matérias encontradas';
  }
  if (emptyState) emptyState.hidden = visible !== 0;
  if (newsGrid) newsGrid.hidden = visible === 0;
}

filters.forEach((button) => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filters.forEach((item) => item.classList.toggle('active', item === button));
  applyFilters();
}));

document.querySelectorAll('[data-filter-link]').forEach((link) => link.addEventListener('click', () => {
  const matching = filters.find((button) => button.dataset.filter === link.dataset.filterLink);
  matching?.click();
}));

if (search) search.addEventListener('input', applyFilters);
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== search) {
    event.preventDefault();
    search.focus();
  }
});

const clearBtn = document.querySelector('#clear-search');
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    search.value = '';
    activeFilter = 'Todos';
    filters[0]?.click();
    search.focus();
  });
}

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

const stories = {
  'tce-contratacoes-temporarias': {
    category: 'PERNAMBUCO',
    title: 'TCE-PE alerta municípios para excesso de contratações temporárias',
    lead: 'Tribunal identificou que 120 das 184 prefeituras pernambucanas têm mais de 50% do quadro formado por servidores temporários.',
    source: '15 de setembro de 2026 • Com informações do TCE-PE e Blog do Edy',
    sourceUrl: 'https://www.tcepe.tc.br/internet/index.php/noticias/505-2026/setembro/8445-tce-pe-alerta-municipios-para-excesso-de-contratacoes-temporarias',
    sourceLabel: 'Leia a publicação oficial do TCE-PE',
    image: './assets/tce-pe-contratacoes-temporarias.jpg',
    imageAlt: 'Sede do Tribunal de Contas do Estado de Pernambuco',
    body: [
      'O Tribunal de Contas do Estado de Pernambuco (TCE-PE) informou que emitirá um alerta às prefeituras sobre o crescimento das contratações temporárias. Segundo levantamento feito a partir do Portal Tome Conta, 120 dos 184 municípios pernambucanos têm mais de 50% do quadro de pessoal formado por servidores temporários.',
      'A orientação do Tribunal é que o concurso público seja preservado como principal forma de ingresso no serviço público. As contratações por tempo determinado devem ser excepcionais e restritas a situações específicas e transitórias, conforme prevê a Constituição Federal.',
      'A Resolução TC nº 296/2025 estabeleceu uma redução gradual: até 31 de dezembro de 2026, os temporários deverão representar no máximo 50% da soma entre servidores efetivos e temporários. O teto cai para 40% ao fim de 2027 e para 30% ao fim de 2028.',
      'O TCE-PE orienta os gestores a adotarem medidas para adequar seus quadros aos limites. O descumprimento pode ser considerado ato de gestão ilegal, com possível impacto no julgamento das contas e aplicação de multas.',
      'A publicação oficial não informou quais municípios integram o grupo das 120 prefeituras. Por isso, não é possível afirmar, com base nesse comunicado, se Bodocó está ou não incluído no levantamento.',
      'A pauta foi repercutida pelo Blog do Edy, e os dados desta matéria foram conferidos na comunicação oficial do TCE-PE. Foto: Marília Auto/TCE-PE.'
    ]
  },
  'raquel-joao-instagram': {
    category: 'POLÍTICA',
    title: 'Raquel Lyra e João Campos elevam o tom e trocam críticas nas redes sociais',
    lead: 'Publicações feitas pelos candidatos ao Governo de Pernambuco mostram que a disputa eleitoral também ganhou força no ambiente digital.',
    source: '14 de setembro de 2026 • Com informações do Blog da Folha',
    sourceUrl: 'https://www.folhape.com.br/colunistas/blogdafolha/raquel-lyra-e-joao-campos-trocam-farpas-pelo-instagram/59765/',
    sourceLabel: 'Leia a publicação original na Folha de Pernambuco',
    image: './assets/raquel-joao-instagram.png',
    imageAlt: 'Montagem editorial com Raquel Lyra e João Campos em lados opostos',
    imageContain: true,
    body: [
      'A disputa pelo Governo de Pernambuco ganhou mais um capítulo nas redes sociais. Na noite do domingo, 13 de setembro, a governadora e candidata à reeleição, Raquel Lyra (PSD), e o candidato João Campos (PSB) utilizaram seus perfis no Instagram para trocar críticas e apresentar versões diferentes sobre o tom adotado durante a campanha eleitoral.',
      'A primeira publicação partiu do perfil oficial de Raquel Lyra. Em um vídeo editado, foram reunidos trechos nos quais João Campos pronunciava repetidamente a palavra “ódio”. O material também exibiu o candidato com o cabelo descolorido durante o Carnaval e utilizou a imagem para questionar sua maturidade e preparação para governar Pernambuco.',
      'Na publicação, a campanha de Raquel associou o adversário a discursos agressivos e procurou estabelecer um contraste entre o que classificou como excesso de ataques e as entregas realizadas pelo Governo do Estado.',
      'Cerca de duas horas depois, João Campos publicou um vídeo em resposta. O candidato do PSB afirmou que as falas utilizadas na montagem estavam relacionadas às denúncias feitas por ele sobre a suposta existência de um “gabinete do ódio” dentro do governo estadual, que, segundo sua versão, teria como objetivo enfraquecer sua candidatura.',
      'João classificou a edição como uma tentativa de retirar suas declarações do contexto original. O candidato também acusou seus adversários de priorizarem ataques pessoais em vez da apresentação de propostas e afirmou que pretende continuar conduzindo sua campanha com uma mensagem de otimismo e realização.',
      'O episódio mostra que a disputa eleitoral em Pernambuco também deverá ser travada intensamente no ambiente digital. Vídeos curtos, montagens e respostas rápidas começam a ocupar espaço central na estratégia das campanhas, que buscam conquistar a atenção dos eleitores e fortalecer suas próprias narrativas.',
      'As acusações apresentadas nas publicações fazem parte do debate político entre os candidatos. Até o momento, os vídeos divulgados não apresentaram comprovações independentes sobre a alegação de existência de um suposto “gabinete do ódio” no Governo de Pernambuco.'
    ]
  },
  'festival-gastronomico-araripina': {
    category: 'REGIÃO',
    title: 'Festival Gastronômico de Araripina celebra sabores do Sertão e fortalece pequenos negócios',
    lead: 'Evento gratuito será realizado nos dias 18 e 19 de setembro, na Praça Dom Campelo de Aragão, com Cozinha Show, concurso de pratos e capacitações.',
    source: '14 de setembro de 2026 • Com informações da Agência Sebrae PE',
    sourceUrl: 'https://pe.agenciasebrae.com.br/cultura-empreendedora/festival-gastronomico-de-araripina-valoriza-sabores-do-sertao-e-fortalece-pequenos-negocios/',
    sourceLabel: 'Leia a publicação original da Agência Sebrae PE',
    image: './assets/festival-gastronomico-araripina.jpg',
    imageAlt: 'Chef apresenta uma aula de culinária para o público durante atividade gastronômica em Araripina',
    body: [
      'Araripina recebe, nos dias 18 e 19 de setembro, a quinta edição do Festival Gastronômico do município. Promovido pelo Sebrae Pernambuco em parceria com a Prefeitura de Araripina, o evento reúne gastronomia regional, capacitação e inovação para apoiar os negócios do setor de alimentação.',
      'A programação será realizada das 18h às 22h, na Praça Dom Campelo de Aragão, no Centro. A entrada é gratuita e a expectativa é receber empresários, chefs, estudantes, profissionais da gastronomia, moradores e turistas. Para participar das aulas da Cozinha Show, é necessário realizar inscrição pela Loja do Sebrae Pernambuco.',
      'Antes mesmo do festival, 30 empresas participantes receberam, ao todo, 300 horas de consultorias especializadas. O trabalho aborda melhoria de processos, manipulação de alimentos, atendimento, gestão, formação de preços, inovação de cardápios e redução de desperdícios.',
      'Um dos principais destaques será a Cozinha Show, com aulas de chefs convidados e profissionais do Instituto César Santos. Os três melhores pratos criados ao longo do projeto serão premiados, e o público também poderá experimentar as receitas e votar em sua preferida.',
      'A proposta é valorizar ingredientes e preparos ligados ao Sertão do Araripe, entre eles queijo coalho, mel do Araripe, carne de carneiro, macaxeira e manteiga da terra. Além de preservar a identidade culinária regional, a iniciativa busca estimular o turismo gastronômico e ampliar as oportunidades para bares, restaurantes e lanchonetes.',
      'SERVIÇO — 5º Festival Gastronômico de Araripina: 18 e 19 de setembro, das 18h às 22h, na Praça Dom Campelo de Aragão, Centro de Araripina. Entrada gratuita. Inscrições para a Cozinha Show disponíveis na Loja do Sebrae Pernambuco.'
    ]
  },
  'bruno-marques-danilo': {
    category: 'POLÍTICA',
    title: 'Bruno Marques anuncia apoio do ex-prefeito de Bodocó Danilo Rodrigues',
    lead: 'Candidato a deputado estadual divulgou a adesão nas redes sociais e afirmou que o apoio fortalece seu projeto político em Pernambuco.',
    source: '8 de setembro de 2026 • Com informações do Blog do Finfa',
    sourceUrl: 'https://blogdofinfa.com.br/2026/09/bruno-marques-anuncia-apoio-do-ex-prefeito-de-bodoco-danilo-rodrigues.html',
    sourceLabel: 'Leia a publicação original no Blog do Finfa',
    image: './assets/bruno-marques-danilo-rodrigues.jpg',
    imageAlt: 'Danilo Rodrigues e Bruno Marques posam juntos durante anúncio de apoio político',
    body: [
      'O candidato a deputado estadual Bruno Marques anunciou, por meio das redes sociais, o apoio do ex-prefeito de Bodocó Danilo Rodrigues à sua candidatura para a Assembleia Legislativa de Pernambuco (Alepe).',
      'A informação foi publicada pelo Blog do Finfa na terça-feira, 8 de setembro. No registro divulgado, Danilo e Bruno aparecem juntos, em um gesto que simboliza a nova aliança política.',
      'Ao comentar a adesão, Bruno afirmou que o apoio tem “peso” e “história”. O candidato também destacou que pretende construir sua caminhada com união, diálogo e compromisso com a população pernambucana.',
      'Segundo Bruno, a chegada de novas lideranças amplia a força do grupo político. A publicação original não informou detalhes sobre compromissos específicos assumidos durante o encontro.'
    ]
  },
  'sonho-da-mae': {
    category: 'VÍDEOS',
    title: 'Filho realiza sonho da mãe ao comprar loja e gesto emociona as redes',
    lead: 'Vídeo publicado no Instagram mostra a reação de uma mãe ao descobrir que o filho comprou a loja que ela sonhava ter.',
    source: '14 de setembro de 2026 • Vídeo: @ellyn_gabriel1/Instagram',
    image: './assets/filho-realiza-sonho-mae.jpg',
    imageAlt: 'Mãe e filho dentro de uma loja em cena do vídeo publicado no Instagram',
    instagramEmbed: 'https://www.instagram.com/reel/DdMtjWWTdNI/embed/',
    instagramUrl: 'https://www.instagram.com/reels/DdMtjWWTdNI/',
    instagramCredit: '@ellyn_gabriel1',
    body: [
      'Um gesto de gratidão entre mãe e filho emocionou internautas após ser compartilhado nas redes sociais. O vídeo mostra o momento em que uma mulher descobre que recebeu do filho um presente que representa a realização de um antigo sonho.',
      'Segundo a legenda publicada pelo perfil @ellyn_gabriel1, o rapaz decidiu retribuir os esforços, cuidados e renúncias da mãe comprando a loja que ela tanto desejava ter. Nas imagens, os dois aparecem juntos no estabelecimento durante a revelação.',
      'A publicação destaca que o significado do gesto vai além do valor material. A surpresa foi apresentada como uma forma de reconhecimento por tudo o que a mãe fez ao longo da vida do filho.',
      'A cena também abriu espaço para uma reflexão sobre gratidão. Nem toda homenagem precisa envolver um grande presente: respeito, presença, carinho e palavras de reconhecimento também são maneiras importantes de demonstrar amor enquanto há tempo.',
      'Os nomes dos envolvidos, a cidade e a data original da gravação não foram informados na postagem. Esta matéria foi produzida com base no conteúdo público compartilhado pelo perfil responsável pelo vídeo.'
    ]
  },
  comite: {
    category: 'POLÍTICA',
    title: 'Anderson Aquino e Iza Arruda inauguram comitê em Ouricuri',
    lead: 'Evento reuniu apoiadores, lideranças políticas e representantes da comunidade na noite de sexta-feira.',
    source: '12 de setembro de 2026 • Com informações da assessoria',
    image: './assets/comite-anderson-iza.jpg',
    imageAlt: 'Inauguração do comitê de Anderson Aquino e Iza Arruda em Ouricuri',
    body: [
      'Na noite desta sexta-feira, um grande público prestigiou a inauguração do comitê do candidato a deputado estadual Dr. Anderson Aquino, em Ouricuri. O evento reuniu lideranças políticas, representantes comunitários, apoiadores e moradores da região.',
      'A abertura do espaço marcou mais uma etapa da campanha e foi apresentada pela organização como uma demonstração de apoio ao projeto de Anderson Aquino para a Assembleia Legislativa de Pernambuco.',
      'Outro destaque da noite foi a presença da deputada federal Iza Arruda, recebida pelos participantes do evento. Integrantes do mesmo partido, Iza e Anderson afirmaram que pretendem atuar juntos por novos investimentos, obras e ações para Ouricuri e para o Araripe.',
      'Durante os discursos, os dois reforçaram a parceria política e agradeceram a participação do público. As informações foram encaminhadas pela assessoria da campanha.'
    ]
  },
  'agenda-anderson': {
    category: 'POLÍTICA',
    title: 'Dr. Anderson intensifica agenda no Araripe e recebe novos apoios',
    lead: 'Candidato visitou feiras, bairros, associações e lideranças do interior de Ouricuri e da região.',
    source: '6 de setembro de 2026 • Com informações da assessoria',
    image: './assets/agenda-anderson.jpg',
    imageAlt: 'Registros da agenda de Dr. Anderson Aquino no Araripe',
    body: [
      'O candidato a deputado estadual Dr. Anderson Aquino cumpriu uma intensa agenda de visitas em Ouricuri e na região do Araripe. O roteiro incluiu passagens pelas feiras livres de Ouricuri e de Timorante, reuniões em bairros, encontros com associações e visitas a lideranças do interior.',
      'Durante as agendas, Anderson conversou diretamente com moradores, correligionários, apoiadores e representantes de associações. O candidato apresentou propostas e ouviu demandas relacionadas aos municípios da região.',
      'Segundo a assessoria, as visitas têm como objetivo fortalecer parcerias, ampliar o diálogo com a população e conquistar novos apoios para a campanha.',
      'A equipe também destacou a recepção encontrada nos locais visitados e afirmou que o projeto pretende ampliar a representação política do Araripe na Assembleia Legislativa de Pernambuco.'
    ]
  },
  'arthur-diniz': {
    category: 'CULTURA',
    title: 'Arthur Diniz faz grande reestreia na Vaquejada de Exu',
    lead: 'Após dois anos afastado dos palcos, o cantor bodocoense retomou sua trajetória em uma noite marcada pela emoção.',
    source: '5 de setembro de 2026 • Redação Portal Bodocó',
    image: './assets/arthur-diniz-exu.jpg',
    imageAlt: 'Cantor Arthur Diniz durante apresentação na Vaquejada de Exu',
    body: [
      'Depois de dois anos afastado dos palcos, o cantor bodocoense Arthur Diniz fez sua grande reestreia durante a Vaquejada de Exu, um dos eventos tradicionais da região.',
      'O retorno foi marcado pela emoção do artista e também de familiares e amigos que acompanharam de perto o momento. Para quem conhece sua caminhada, vê-lo novamente diante de um grande público representou mais do que uma apresentação: foi a retomada de um sonho.',
      'Mesmo enfrentando momentos difíceis durante o período em que permaneceu parado, Arthur não desistiu da música. O cantor continuou acreditando na possibilidade de retornar e reconstruir sua trajetória artística.',
      'Com o apoio dos empresários Mota e Rodrigo, da Cromo Produções, Arthur Diniz volta aos palcos disposto a viver uma nova fase da carreira. A apresentação em Exu marcou o primeiro passo desse recomeço.'
    ]
  },
  'agua-animais': {
    category: 'UTILIDADE PÚBLICA',
    title: 'Tá quente que nem a mulesta: coloque água para os animais de rua',
    lead: 'Portal Bodocó incentiva moradores a deixar água limpa nas calçadas e em pontos estratégicos durante a onda de calor.',
    source: '4 de setembro de 2026 • Campanha Portal Bodocó',
    image: './assets/agua-animais-rua.jpg',
    imageAlt: 'Campanha do Portal Bodocó pedindo água fresca para animais de rua',
    body: [
      'Tá quente que nem a mulesta, né!? Pois é! Enquanto a temperatura sobe, cães, gatos e outros animais que vivem nas ruas também sofrem e nem sempre encontram onde se refrescar.',
      'O Portal Bodocó convida cada morador a colocar uma vasilha com água limpa e fresca na calçada ou em um ponto estratégico, de preferência à sombra. É um gesto simples que pode fazer uma grande diferença.',
      'Troque a água com frequência, mantenha o recipiente higienizado e não deixe água parada por vários dias. Assim, a solidariedade com os animais também vem acompanhada do cuidado com a saúde de todos.',
      'Seja solidário com quem não consegue pedir ajuda. Bote uma aguinha para os bichinhos da rua.'
    ]
  },
  'galo-hospital': {
    category: 'HUMOR',
    title: 'Homem leva galo com ansiedade ao hospital de Bodocó',
    lead: 'Segundo o dono, a ave estava “cantando fora de hora”. Calma: esta publicação é apenas uma brincadeira.',
    source: '2 de setembro de 2026 • Humor Portal Bodocó',
    image: './assets/galo-no-hospital.jpg',
    imageAlt: 'Montagem humorística de homem segurando um galo em frente ao Hospital Municipal de Bodocó',
    body: [
      'Um homem teria levado seu galo ao Hospital Municipal de Bodocó depois de perceber um comportamento, digamos, fora do comum. De acordo com o preocupado tutor, a ave estaria sofrendo de ansiedade porque começou a cantar fora de hora.',
      'A situação logo chamou atenção: enquanto o homem aguardava uma explicação, o galo parecia tranquilo e pronto para anunciar o amanhecer — mesmo sem ninguém saber exatamente que horas eram.',
      'O Portal Bodocó esclarece: esta história é totalmente humorística, criada apenas para divertir. O episódio não aconteceu e não possui qualquer relação com atendimentos reais do Hospital Municipal de Bodocó.'
    ]
  },
  cultura: ['CULTURA', 'Agenda cultural reúne música, feira e tradição no fim de semana', 'Uma agenda demonstrativa valoriza os encontros, os artistas e as tradições que dão identidade à região.'],
  esporte: ['ESPORTE', 'Esporte amador ganha força e movimenta atletas de toda a região', 'Corrida, futebol e artes marciais mostram o potencial dos talentos locais em uma chamada de exemplo.'],
  servico: ['SERVIÇO', 'Guia rápido: os principais serviços e contatos úteis de Bodocó', 'Uma área prática para o leitor encontrar telefones, horários e informações importantes do município.'],
  politica: ['POLÍTICA', 'Debate regional reúne propostas para o desenvolvimento do Araripe', 'Lideranças discutem infraestrutura, geração de renda e serviços públicos em uma pauta demonstrativa.'],
  comercio: ['BODOCÓ', 'Comércio local prepara ações para movimentar o centro da cidade', 'Programação de exemplo destaca pequenos negócios, empreendedores e oportunidades para o consumidor.'],
  agricultura: ['REGIÃO', 'Produtores apostam em inovação para enfrentar períodos de estiagem', 'Técnicas sustentáveis ajudam a fortalecer a produção sertaneja e o uso responsável da água.'],
  jiujitsu: ['ESPORTE', 'Jiu-jítsu reúne jovens atletas em encontro regional', 'Evento demonstrativo celebra disciplina, amizade e inclusão por meio do esporte.'],
  memoria: ['CULTURA', 'Memória de Bodocó ganha espaço em exposição comunitária', 'Fotografias e relatos preservam histórias de diferentes gerações em uma mostra fictícia.'],
  bairros: ['BODOCÓ', 'Bairros recebem mutirão demonstrativo de serviços e cidadania', 'Ação fictícia ilustra como avisos de utilidade pública podem aparecer no novo portal.'],
  entrevista: ['FALA PERNAMBUCO', 'Quem faz a cultura pulsar no Sertão', 'Uma conversa de demonstração sobre música, identidade e as histórias de quem movimenta a cena regional.']
};

const dialog = document.querySelector('#story-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogLead = document.querySelector('#dialog-lead');
const dialogCategory = document.querySelector('#dialog-category');
const dialogMedia = document.querySelector('#dialog-media');
let lastStoryTrigger;

function openStory(card) {
  const rawStory = stories[card.dataset.story];
  if (!rawStory) return;
  const story = Array.isArray(rawStory) ? {
    category: rawStory[0],
    title: rawStory[1],
    lead: rawStory[2],
    source: 'Conteúdo demonstrativo',
    demo: true,
    body: [
      'Esta é uma visualização funcional do modelo de leitura. Na versão editorial, este espaço receberá o texto completo, fotografias, créditos, fontes e links relacionados.',
      'O conteúdo acima é fictício e foi incluído exclusivamente para demonstrar a experiência de navegação do novo portal.'
    ]
  } : rawStory;
  lastStoryTrigger = card;
  if (dialogCategory) dialogCategory.textContent = story.category;
  if (dialogTitle) dialogTitle.textContent = story.title;
  if (dialogLead) dialogLead.textContent = story.lead;
  
  const sourceEl = document.querySelector('#dialog-source');
  if (sourceEl) sourceEl.textContent = story.source || 'Redação Portal Bodocó';
  
  const demoEl = document.querySelector('#dialog-demo');
  if (demoEl) demoEl.hidden = !story.demo;

  const dialogImage = document.querySelector('#dialog-image');
  if (dialogImage) {
    dialogImage.hidden = !story.image;
    dialogImage.src = story.image || '';
    dialogImage.alt = story.imageAlt || '';
    dialogImage.classList.toggle('image-contain', Boolean(story.imageContain));
  }
  
  if (dialogMedia) {
    dialogMedia.replaceChildren();
    if (story.instagramEmbed && story.instagramUrl) {
      const figure = document.createElement('figure');
      figure.className = 'instagram-embed';

      const iframe = document.createElement('iframe');
      iframe.src = story.instagramEmbed;
      iframe.title = `Vídeo do Instagram: ${story.title}`;
      iframe.loading = 'lazy';
      iframe.allow = 'encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';

      const caption = document.createElement('figcaption');
      caption.append('Vídeo: ');
      const link = document.createElement('a');
      link.href = story.instagramUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = `${story.instagramCredit || 'Instagram'} — assistir no Instagram`;
      caption.append(link);

      figure.append(iframe, caption);
      dialogMedia.append(figure);
    }
  }

  const dialogContent = document.querySelector('#dialog-content');
  if (dialogContent) {
    const contentNodes = (story.body || []).map((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    });
    if (story.sourceUrl) {
      const sourceLink = document.createElement('a');
      sourceLink.className = 'story-source-link';
      sourceLink.href = story.sourceUrl;
      sourceLink.target = '_blank';
      sourceLink.rel = 'noopener noreferrer';
      sourceLink.textContent = story.sourceLabel || 'Consultar fonte original';
      contentNodes.push(sourceLink);
    }
    dialogContent.replaceChildren(...contentNodes);
  }
  if (dialog) dialog.showModal();
}

function bindStoryEvents(element) {
  element.addEventListener('click', () => openStory(element));
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openStory(element);
    }
  });
}

document.querySelectorAll('.story-open').forEach(bindStoryEvents);

const closeDialogBtn = document.querySelector('.dialog-close');
if (closeDialogBtn) closeDialogBtn.addEventListener('click', () => dialog.close());

if (dialog) {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (dialogMedia) dialogMedia.replaceChildren();
    lastStoryTrigger?.focus();
  });
}

// -------------------------------------------------------------
// INTEGRAÇÃO HYGRAPH (CMS)
// -------------------------------------------------------------
async function carregarNoticiasHygraph() {
  const query = `
    query ObterNoticias {
      noticias(orderBy: publishedAt_DESC) {
        id
        titulo
        subtitulo
        categoria
        publishedAt
        capa {
          url
        }
        conteudo {
          text
          raw
        }
      }
    }
  `;

  try {
    const resposta = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const resultado = await resposta.json();
    const listaNoticias = resultado?.data?.noticias;

    if (!Array.isArray(listaNoticias) || listaNoticias.length === 0) return;

    listaNoticias.reverse().forEach((noticia) => {
      const storyKey = `hygraph-${noticia.id}`;
      const dataObj = new Date(noticia.publishedAt);
      const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long'
      });
      const dataIso = dataObj.toISOString().split('T')[0];
      const categoriaNome = (noticia.categoria || 'Geral').toUpperCase();

      let paragrafos = [];
      if (noticia.conteudo?.raw?.children) {
        paragrafos = noticia.conteudo.raw.children
          .filter((bloco) => bloco.children)
          .map((bloco) => bloco.children.map((c) => c.text).join(''))
          .filter((txt) => txt.trim().length > 0);
      } else if (noticia.conteudo?.text) {
        paragrafos = noticia.conteudo.text.split('\n').filter((t) => t.trim().length > 0);
      }

      stories[storyKey] = {
        category: categoriaNome,
        title: noticia.titulo,
        lead: noticia.subtitulo || '',
        source: `${dataFormatada} de ${dataObj.getFullYear()} • Redação Portal Bodocó`,
        image: noticia.capa?.url || '',
        imageAlt: noticia.titulo,
        body: paragrafos
      };

      if (newsGrid) {
        const article = document.createElement('article');
        article.className = 'news-card story-open';
        article.tabIndex = 0;
        article.setAttribute('role', 'button');
        article.dataset.story = storyKey;
        article.dataset.category = noticia.categoria || 'Geral';
        article.dataset.title = noticia.titulo;

        article.innerHTML = `
          <div class="card-visual article-card-image" aria-hidden="true">
            ${noticia.capa?.url ? `<img src="${noticia.capa.url}" alt="" />` : ''}
          </div>
          <div class="card-copy">
            <div class="story-meta">
              <span class="tag tag-yellow">${categoriaNome}</span>
              <span>NOVA</span>
            </div>
            <h3>${noticia.titulo}</h3>
            ${noticia.subtitulo ? `<p>${noticia.subtitulo}</p>` : ''}
            <time datetime="${dataIso}">${dataFormatada}</time>
          </div>
        `;

        bindStoryEvents(article);
        newsGrid.insertBefore(article, newsGrid.firstChild);
      }
    });

    cards = [...document.querySelectorAll('.news-card')];
    applyFilters();
  } catch (erro) {
    console.error('Erro ao conectar ao Hygraph:', erro);
  }
}

carregarNoticiasHygraph();

// -------------------------------------------------------------
// ENQUETE E OUTRAS FUNCIONALIDADES
// -------------------------------------------------------------
const pollForm = document.querySelector('#poll-form');
if (pollForm) {
  const voteButton = pollForm.querySelector('.vote-button');
  const pollFeedback = document.querySelector('#poll-feedback');
  const baseline = { Segurança: 37, Infraestrutura: 29, Saúde: 24, 'Cultura e esporte': 10 };

  pollForm.addEventListener('change', () => { if (voteButton) voteButton.disabled = false; });

  function renderResults(selected) {
    const totals = { ...baseline };
    if (selected) totals[selected] += 1;
    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
    pollForm.querySelectorAll('.poll-option').forEach((label) => {
      const input = label.querySelector('input');
      if (input) {
        const value = input.value;
        const percent = Math.round((totals[value] / total) * 100);
        label.style.setProperty('--result-width', `${percent}%`);
        const em = label.querySelector('em');
        if (em) em.textContent = `${percent}%`;
      }
    });
  }

  function showVotedState(selected) {
    renderResults(selected);
    if (voteButton) {
      voteButton.textContent = 'Voto registrado';
      voteButton.disabled = true;
    }
    if (pollFeedback) {
      pollFeedback.innerHTML = `Obrigado por participar! <button type="button" id="reset-poll">Reiniciar demonstração</button>`;
      document.querySelector('#reset-poll')?.addEventListener('click', resetPoll);
    }
  }

  function resetPoll() {
    localStorage.removeItem('portal-bodoco-demo-vote');
    pollForm.reset();
    pollForm.querySelectorAll('.poll-option').forEach((label) => {
      label.style.removeProperty('--result-width');
      const em = label.querySelector('em');
      if (em) em.textContent = '';
    });
    if (voteButton) {
      voteButton.innerHTML = 'Votar agora <span aria-hidden="true">→</span>';
      voteButton.disabled = true;
    }
    if (pollFeedback) pollFeedback.textContent = '';
  }

  pollForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = new FormData(pollForm).get('poll');
    if (!selected) return;
    localStorage.setItem('portal-bodoco-demo-vote', selected);
    showVotedState(selected);
    const toast = document.querySelector('#toast');
    if (toast) {
      toast.textContent = 'Seu voto de demonstração foi registrado.';
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 2600);
    }
  });

  const savedVote = localStorage.getItem('portal-bodoco-demo-vote');
  if (savedVote && baseline[savedVote] !== undefined) {
    const radio = pollForm.querySelector(`input[value="${CSS.escape(savedVote)}"]`);
    if (radio) radio.checked = true;
    showVotedState(savedVote);
  }
}

const socialBtn = document.querySelector('[data-placeholder="social"]');
if (socialBtn) {
  socialBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const toast = document.querySelector('#toast');
    if (toast) {
      toast.textContent = 'Link demonstrativo — conecte aqui o Instagram oficial.';
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 2600);
    }
  });
}

const adTabs = [...document.querySelectorAll('.ad-tab')];
const adCards = [...document.querySelectorAll('.ad-card')];

adTabs.forEach((tab) => tab.addEventListener('click', () => {
  const category = tab.dataset.adFilter;
  adTabs.forEach((item) => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  adCards.forEach((card) => {
    card.hidden = category !== 'Todos' && card.dataset.adCategory !== category;
  });
}));

const adDialog = document.querySelector('#ad-inquiry-dialog');
const adForm = document.querySelector('#ad-inquiry-form');
let lastAdTrigger;

function openAdInquiry(trigger, company = '') {
  lastAdTrigger = trigger;
  if (company && company !== 'Sua empresa no Portal Bodocó' && adForm?.elements?.company) {
    adForm.elements.company.value = company;
  }
  if (adDialog) {
    adDialog.showModal();
    requestAnimationFrame(() => adForm?.elements?.name?.focus());
  }
}

const openAdInquiryBtn = document.querySelector('#open-ad-inquiry');
if (openAdInquiryBtn) {
  openAdInquiryBtn.addEventListener('click', (event) => openAdInquiry(event.currentTarget));
}

document.querySelectorAll('.ad-detail').forEach((button) => button.addEventListener('click', () => {
  openAdInquiry(button, button.dataset.adTitle);
}));

const closeAdInquiryBtn = document.querySelector('#close-ad-inquiry');
if (closeAdInquiryBtn && adDialog) {
  closeAdInquiryBtn.addEventListener('click', () => adDialog.close());
}

if (adDialog) {
  adDialog.addEventListener('click', (event) => {
    if (event.target === adDialog) adDialog.close();
  });
  adDialog.addEventListener('close', () => lastAdTrigger?.focus());
}

if (adForm) {
  adForm.addEventListener('submit', (event) => {
    event.preventDefault();
    adDialog?.close();
    adForm.reset();
    const toast = document.querySelector('#toast');
    if (toast) {
      toast.textContent = 'Solicitação simulada — o canal comercial será conectado depois.';
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 3000);
    }
  });
}

// -------------------------------------------------------------
// BARRA DE SERVIÇOS EM TEMPO REAL (RELÓGIO, CLIMA E DÓLAR)
// -------------------------------------------------------------
function atualizarRelogio() {
  const relogioEl = document.querySelector('#live-clock');
  if (!relogioEl) return;
  const agora = new Date();
  relogioEl.textContent = agora.toLocaleTimeString('pt-BR', { hour12: false });
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

async function buscarClimaBodoco() {
  const climaEl = document.querySelector('#weather-temp');
  if (!climaEl) return;
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-7.7797&longitude=-39.9333&current_weather=true');
    const dados = await res.json();
    if (dados?.current_weather) {
      const temp = Math.round(dados.current_weather.temperature);
      climaEl.textContent = `${temp}°C ☀️`;
    }
  } catch (e) {
    climaEl.textContent = '31°C ☀️';
  }
}

async function buscarCotacaoDolar() {
  const dolarEl = document.querySelector('#usd-rate');
  if (!dolarEl) return;
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
    const dados = await res.json();
    if (dados?.USDBRL?.bid) {
      const valor = parseFloat(dados.USDBRL.bid).toFixed(2).replace('.', ',');
      dolarEl.textContent = `R$ ${valor}`;
    }
  } catch (e) {
    dolarEl.textContent = 'Indisponível';
  }
}

buscarClimaBodoco();
buscarCotacaoDolar();

setInterval(() => {
  buscarClimaBodoco();
  buscarCotacaoDolar();
}, 15 * 60 * 1000);

// -------------------------------------------------------------
// ROTAÇÃO DE MANCHETES AUTOMÁTICAS NO TICKER
// -------------------------------------------------------------
function iniciarRotacaoManchetes() {
  const headlineEl = document.querySelector('#ticker-headline-text');
  if (!headlineEl) return;

  function recolherManchetes() {
    const lista = [];

    // Lê matérias cadastradas no objeto stories
    if (typeof stories === 'object' && stories !== null) {
      Object.entries(stories).forEach(([chave, valor]) => {
        const titulo = Array.isArray(valor) ? valor[1] : valor?.title;
        if (titulo && typeof titulo === 'string' && titulo.trim().length > 0) {
          lista.push({ texto: titulo.trim(), story: chave });
        }
      });
    }

    // Lê matérias criadas dinamicamente na página
    document.querySelectorAll('.news-card, .lead-story, .mini-story').forEach((el) => {
      const h2 = el.querySelector('h2');
      const h3 = el.querySelector('h3');
      const titulo = (h2?.textContent || h3?.textContent || '').trim();
      const storyKey = el.dataset.story;
      if (titulo && !lista.some((item) => item.texto === titulo)) {
        lista.push({ texto: titulo, story: storyKey });
      }
    });

    return lista;
  }

  let listaNoticias = recolherManchetes();
  let indice = 0;

  function apresentarNoticia(item) {
    if (!item) return;
    headlineEl.textContent = item.texto;
    headlineEl.onclick = (e) => {
      e.preventDefault();
      if (item.story) {
        const cartaoAlvo = document.querySelector(`[data-story="${item.story}"]`);
        if (cartaoAlvo && typeof openStory === 'function') {
          openStory(cartaoAlvo);
        } else if (typeof stories[item.story] !== 'undefined') {
          const elementoVirtual = document.createElement('div');
          elementoVirtual.dataset.story = item.story;
          openStory(elementoVirtual);
        }
      }
    };
  }

  function avancarManchete() {
    const novasNoticias = recolherManchetes();
    if (novasNoticias.length > 0) {
      listaNoticias = novasNoticias;
    }

    if (listaNoticias.length === 0) return;

    headlineEl.classList.add('fade-out');

    setTimeout(() => {
      indice = (indice + 1) % listaNoticias.length;
      apresentarNoticia(listaNoticias[indice]);
      headlineEl.classList.remove('fade-out');
    }, 400);
  }

  // Define a primeira notícia de imediato
  if (listaNoticias.length > 0) {
    apresentarNoticia(listaNoticias[0]);
  }

  // Alterna a cada 5 segundos
  setInterval(avancarManchete, 5000);
}

iniciarRotacaoManchetes();