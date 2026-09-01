import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-08-30',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

const citiesByProvince = {
  AB: [
    'Calgary',
    'Edmonton',
    'Red Deer',
    'Lethbridge',
    'St. Albert',
    'Medicine Hat',
    'Grande Prairie',
    'Airdrie',
  ],

  BC: [
    'Vancouver',
    'Victoria',
    'Surrey',
    'Burnaby',
    'Richmond',
    'Kelowna',
    'Abbotsford',
    'Coquitlam',
    'Nanaimo',
    'Kamloops',
    'Langley',
    'Delta',
    'North Vancouver',
    'New Westminster',
    'Prince George',
    'Chilliwack',
  ],

  MB: [
    'Winnipeg',
    'Brandon',
    'Steinbach',
    'Thompson',
    'Portage la Prairie',
    'Winkler',
    'Selkirk',
    'Morden',
    'Dauphin',
    'The Pas',
    'Flin Flon',
  ],

  SK: [
    'Saskatoon',
    'Regina',
    'Prince Albert',
    'Moose Jaw',
    'Swift Current',
    'Yorkton',
    'North Battleford',
    'Estevan',
    'Weyburn',
    'Lloydminster',
    'Martensville',
    'Warman',
  ],

  ON: [
    'Toronto',
    'Ottawa',
    'Mississauga',
    'Brampton',
    'Hamilton',
    'London',
    'Markham',
    'Vaughan',
    'Kitchener',
    'Windsor',
    'Richmond Hill',
    'Oakville',
    'Burlington',
    'Oshawa',
    'Barrie',
    'St. Catharines',
    'Cambridge',
    'Kingston',
    'Guelph',
    'Waterloo',
    'Thunder Bay',
    'Sudbury',
    'Peterborough',
  ],

  QC: [
    'Montréal',
    'Quebec City',
    'Laval',
    'Gatineau',
    'Longueuil',
    'Sherbrooke',
    'Lévis',
    'Saguenay',
    'Trois-Rivières',
    'Terrebonne',
    'Saint-Jean-sur-Richelieu',
    'Brossard',
    'Repentigny',
    'Drummondville',
    'Saint-Jérôme',
    'Granby',
  ],

  NB: [
    'Moncton',
    'Saint John',
    'Fredericton',
    'Dieppe',
    'Riverview',
    'Miramichi',
    'Edmundston',
    'Bathurst',
    'Campbellton',
    'Oromocto',
    'Sackville',
  ],

  NS: [
    'Halifax',
    'Sydney',
    'Dartmouth',
    'Truro',
    'New Glasgow',
    'Glace Bay',
    'Kentville',
    'Amherst',
    'Bridgewater',
    'Yarmouth',
  ],

  NL: [
    "St. John's",
    'Mount Pearl',
    'Corner Brook',
    'Conception Bay South',
    'Paradise',
    'Grand Falls-Windsor',
    'Gander',
    'Happy Valley-Goose Bay',
    'Labrador City',
    'Stephenville',
    'Carbonear',
    'Clarenville',
  ],

  PE: [
    'Charlottetown',
    'Summerside',
    'Stratford',
    'Cornwall',
    'Three Rivers',
    'Kensington',
    'Alberton',
    'Souris',
  ],

  YT: [
    'Whitehorse',
    'Dawson City',
    'Watson Lake',
    'Haines Junction',
    'Carmacks',
    'Faro',
    'Mayo',
    'Teslin',
  ],

  NT: [
    'Yellowknife',
    'Hay River',
    'Inuvik',
    'Fort Smith',
    'Behchoko',
    'Fort Simpson',
    'Norman Wells',
    'Tuktoyaktuk',
    'Fort Providence',
    'Fort Liard',
  ],

  NU: [
    'Iqaluit',
    'Rankin Inlet',
    'Arviat',
    'Baker Lake',
    'Cambridge Bay',
    'Igloolik',
    'Pond Inlet',
    'Kugluktuk',
    'Kinngait',
    'Pangnirtung',
  ],
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function seedProvinceCities(provinceCode, cities) {
  const province = await client.fetch(
    `*[_type == "province" && code == $code][0]{
      _id,
      name,
      code
    }`,
    {
      code: provinceCode,
    },
  )

  if (!province) {
    throw new Error(
      `No se encontró una provincia con código ${provinceCode}. Créala primero en Sanity.`,
    )
  }

  console.log(
    `\nAgregando ciudades de ${province.name} (${province.code})...\n`,
  )

  for (const cityName of cities) {
    const slug = slugify(cityName)

    const documentId = `city-${provinceCode.toLowerCase()}-${slug}`

    const city = {
      _id: documentId,
      _type: 'city',
      name: cityName,
      slug: {
        _type: 'slug',
        current: slug,
      },
      province: {
        _type: 'reference',
        _ref: province._id,
      },
    }

    await client.createIfNotExists(city)

    console.log(`✓ ${cityName}`)
  }
}

async function run() {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    throw new Error(
      'Falta SANITY_API_WRITE_TOKEN en las variables de entorno.',
    )
  }

  try {
    for (const [provinceCode, cities] of Object.entries(citiesByProvince)) {
      await seedProvinceCities(provinceCode, cities)
    }

    console.log('\n✅ Seed completado correctamente.')
  } catch (error) {
    console.error('\n❌ Error ejecutando el seed:')
    console.error(error)

    process.exit(1)
  }
}

run()