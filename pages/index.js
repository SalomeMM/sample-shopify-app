// when we are gonna be authenticating stores or merchants, Shopify is going to redirect from the app authorization back to our app and in order to do this or allow this our application needs to be hosted on an HTTPS address. Our local host is not, so we are gonna use Ngrok, which takes our local host and hosts it on an HTTPS address. This way my local host becomes secure (http"S").
import React, { useState } from "react"; // we are gonna be using the state to manage the opening and closing of the model for the resource picker
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
import store from "store-js";
import ProductList from "../components/ProductList";
import axios from "axios";

function Index() {
  const [modal, setModal] = useState({ open: false });
  const emptyState = !store.get("ids"); // true or false depending on whether there are ids (products) or not

  function handleSelection(resources) {
    // resources from the resource picker. This function will handle the modal information and it will also close the modal.
    const idsFromResources = resources.selection.map((product) => product.id); // only get product id, not the whole product
    setModal({ open: false }); // close the modal once we do something
    store.set("ids", idsFromResources);
    console.log("This is product ids", store.get("ids"));

    const selectedProducts = resources.selection;

    deleteApiData(); // we need to clear our products array before we send new products in

    selectedProducts.map((product) => makeApiCall(product)); // we iterate through our resources.selection and for each product we make an API call, so it sends that product individaually
  }

  function deleteApiData() {
    const url = "/api/products";

    axios.delete(url);
  }

  async function makeApiCall(products) {
    const url = "/api/products";

    axios
      .post(url, products)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: "Select New Products",
          onAction: () => setModal({ open: true }),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)} // when a product is selected from the resource picker it sends the resoures to our handleSelecion function
      />

      {emptyState ? ( // if empty state is true, then we will display this
        <Layout>
          <EmptyState
            heading="Manage your inventory transfers"
            action={{
              content: "Select Products",
              onAction: () => setModal({ open: true }),
            }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>Select Products</p>
          </EmptyState>
        </Layout>
      ) : (
        <ProductList />
      )}
    </Page>
  );
}

export default Index;