const { ApolloServer, gql, MockList } = require("apollo-server");
const faker = require("faker");

const typeDefs = gql`

  type Product {
        id: ID!
        name: String!
        image: String!
        type: String!
        catalog: Catalog
  }
  type Query {
    forYou: [Catalog!]!
  }


  type OfferPrice {
    display_text: String
    amount: Int
    no_of_offers: Int
    icon_url: String
  }

  type Tracking {
    id: String
    feed_source: String
  }

  type Margin {
    enabled: Boolean
  }

  type ProductImages {
    id: Int
    url: String
  }

  type Shipping_2 {
    charges: Int
    discount: Int
  }

  type Shipping {
    charges: Int
    discount: Int
  }

  type Media {
    id: Int
    status: Int
    url: String
    type: String
  }

  type TopImageReview {
    review_id: Int
    reviewer_id: Int
    rating: Int
    helpful_count: Int
    marked_helpful: Boolean
    comments: String
    media: [Media]
  }

  type RatingCountMap {
    a: Int
    b: Int
    c: Int
    d: Int
    e: Int
  }

  type CatalogReviewsSummary {
    average_rating: Float
    absolute_average_rating: Int
    average_rating_str: String
    rating_scale: Int
    review_count: Int
    rating_count: Int
    top_image_review: TopImageReview
    rating_count_map: RatingCountMap
  }

  type AssuredDetails {
    is_assured: Boolean
    message: String
  }

  type Catalog {
    id: Int
    name: String
    category_id: Int
    sub_sub_category_name: String
    min_catalog_price: Int
    min_product_price: Int
    description: String
    full_details: String
    share_text: String
    hot: Boolean
    type: String
    pre_booking: Boolean
    priority: Int
    num_suppliers: Int
    num_designs: Int
    image: String
    collage_image: String
    image_aspect_ratio: Float
    collage_image_aspect_ratio: Float
    created: String
    created_iso: String
    valid: Boolean
    trend: String
    popular: Boolean
    has_mrp: Boolean
    is_added_to_wishlist: Boolean
    mall_verified: Boolean
    shipping_charges_adjustment: Int
    text_image: String
    has_same_price_products: Boolean
    activated: String
    activated_iso: String
    num_shares: String
    price_type_id: String
    returns_offer_text: String
    consumer_share_text: String
    offer_price: OfferPrice
    tracking: Tracking
    margin: Margin
    product_images: [ProductImages]
    gray_tags: [String]
    tags: [String]
    shipping_2: Shipping_2
    shipping: Shipping
    catalog_reviews_summary: CatalogReviewsSummary
    story_images: [String]
    assured_details: AssuredDetails
  }
`;

///*const resolvers = {
//  Query: {
//    forYou: () => "Hello World!"
//  }
//};*/
const mocks = {
    Query: () => ({
        forYou: () => new MockList(20)
    }),
    Catalog: () => ({
        name: () => faker.random.arrayElement(["Suits & Dress Materials", "Aagyeyi Superior  Tops & Tunics", "Trendy Pretty Salwar Suits & Dress Materials"])
    }),
    ID: () => faker.random.uuid(),
    Int: () => faker.random.number({min: 1, max: 10}),
    String: () => faker.name.firstName(),
    Boolean: () => true
};


const server = new ApolloServer({
  typeDefs,
  mocks
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`
    🚀  Server is ready at ${url}
    📭  Query at https://studio.apollographql.com/dev
  `);
});
//server.listen().then(({ url }) => console.log(`Server Running on port ${url}`));
