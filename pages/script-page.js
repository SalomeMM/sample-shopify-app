import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const CREATE_SCRIPT_TAG = gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
            scriptTag {
                id
            }
            userErrors {
                field
                message
            }
        }
    }
`;

const QUERY_SCRIPTTAGS = gql`
  query {
    scriptTags(first: 5) {
      edges {
        node {
          id
          src
          displayScope
        }
      }
    }
  }
`;

const DELETE_SCRIPTTAG = gql`
  mutation scriptTagDelete($id: ID!) {
    scriptTagDelete(id: $id) {
      deletedScriptTagId
      userErrors {
        field
        message
      }
    }
  }
`;

function ScriptPage() {
  const [createScripts] = useMutation(CREATE_SCRIPT_TAG);
  const [deleteScripts] = useMutation(DELETE_SCRIPTTAG);
  const { loading, error, data } = useQuery(QUERY_SCRIPTTAGS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return;
  <div>
    <h1>Script tags right now</h1>;
    <Button
      primary
      size="slim"
      type="submit"
      onClick={() => {
        createScripts({
          variables: {
            input: {
              src: "https://44adda1bd61a.ngrok.io/test-script.js",
              displayScope: "ALL",
            },
          },
          refetchQueries: [{ query: QUERY_SCRIPTTAGS }],
        });
      }}
    >
      Create Script Tag
    </Button>
    {data.scriptTags.edges.map((item) => {
      return (
        <div key={item.node.id}>
          <p>{item.node.ip}</p>
        </div>
      );
    })}
  </div>;
}

export default ScriptPage;
