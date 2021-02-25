import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, ResourceList, Stack, TextStyle, Thumbnail } from "@shopify/polaris";
import store from "stor-js";

const GET_PRODUCTS_BY_ID = gql`
query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        handle
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    }
  }
`;

// now we need to create the component that is going to display all of these things