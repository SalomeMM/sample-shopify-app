// when we are gonna be authenticating stores or merchants, Shopify is going to redirect from the app authorization back to our app and in order to do this or allow this our application needs to be hosted on an HTTPS address. Our local host is not, so we are gonna use Ngrok, which takes our local host and hosts it on an HTTPS address. This way my local host becomes secure (http"S").
import React, { useState } from "react"; // we are gonna be using the state to manage the opening and closing of the model for the resource picker
import { EmptyState, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import store from "store-js";
import ProductList from "../components/ProductList";
import axios from "axios";

function Index() {
  const [modal, setModal] = useState({ open: false })
  const emptyState = !store.get("ids"); // true or false depending on whether there are ids (products) or not

  function handleSelection(resources) {
    // resources from the resource picker. This function will handle the modal information and it will also close the modal.
    const idsFromResources = resources.selection.map((product) => product.id); // only get product id, not the whole product
    setModal({ open: false }); // close the modal once we do something
    store.set("ids", idsFromResources);
    console.log("This is product ids", store.get("ids"));
  }

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onCancel={() => setModal({ open: false })}
        onSelection={(resources) => handleSelection(resources)}
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
    // <div>
    //   <p>Hello</p>
    // </div>
  )
}

export default Index;

// commented out because changed into a functional component, according to the standards for react
// const Index = () => (
//     <div>
//         <p>Sample app using React and Next.js</p>
//     </div>
// );

// export default Index;
