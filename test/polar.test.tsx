// import {
//   AppProvider,
//   Badge,
//   Card,
//   IndexTable,
//   Text,
//   useBreakpoints,
//   useIndexResourceState,
// } from "@shopify/polaris";
// import enTranslations from "@shopify/polaris/locales/en.json";
// import { mount } from "@shopify/react-testing";
// import { render as rtlRender, screen } from "@testing-library/react";
// import { userEvent } from "@testing-library/user-event";

// // Mock window.matchMedia
// // @ts-ignore
// window.matchMedia =
//   window.matchMedia ||
//   function () {
//     return {
//       matches: false,
//       addListener: function () {},
//       removeListener: function () {},
//     };
//   };

// function SimpleIndexTableExample() {
//   const orders = [
//     {
//       id: "1020",
//       order: "#1020",
//       date: "Jul 20 at 4:34pm",
//       customer: "Jaydon Stanton",
//       total: "$969.44",
//       paymentStatus: <Badge progress="complete">Paid</Badge>,
//       fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
//     },
//     {
//       id: "1019",
//       order: "#1019",
//       date: "Jul 20 at 3:46pm",
//       customer: "Ruben Westerfelt",
//       total: "$701.19",
//       paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
//       fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
//     },
//     {
//       id: "1018",
//       order: "#1018",
//       date: "Jul 20 at 3.44pm",
//       customer: "Leo Carder",
//       total: "$798.24",
//       paymentStatus: <Badge progress="complete">Paid</Badge>,
//       fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
//     },
//   ];
//   const resourceName = {
//     singular: "order",
//     plural: "orders",
//   };

//   const { selectedResources, allResourcesSelected, handleSelectionChange } =
//     useIndexResourceState(orders);

//   const rowMarkup = orders.map(
//     (
//       { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
//       index
//     ) => (
//       <IndexTable.Row
//         id={id}
//         key={id}
//         selected={selectedResources.includes(id)}
//         position={index}
//       >
//         <IndexTable.Cell>
//           <Text variant="bodyMd" fontWeight="bold" as="span">
//             {order}
//           </Text>
//         </IndexTable.Cell>
//         <IndexTable.Cell>{date}</IndexTable.Cell>
//         <IndexTable.Cell>{customer}</IndexTable.Cell>
//         <IndexTable.Cell>
//           <Text as="span" alignment="end" numeric>
//             {total}
//           </Text>
//         </IndexTable.Cell>
//         <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
//         <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
//       </IndexTable.Row>
//     )
//   );

//   return (
//     <AppProvider i18n={enTranslations}>
//       <Text as="p">Selected: {selectedResources.length}</Text>

//       <Card>
//         <IndexTable
//           condensed={useBreakpoints().smDown}
//           resourceName={resourceName}
//           itemCount={orders.length}
//           selectedItemsCount={
//             allResourcesSelected ? "All" : selectedResources.length
//           }
//           onSelectionChange={handleSelectionChange}
//           headings={[
//             { title: "Order" },
//             { title: "Date" },
//             { title: "Customer" },
//             { title: "Total", alignment: "end" },
//             { title: "Payment status" },
//             { title: "Fulfillment status" },
//           ]}
//         >
//           {rowMarkup}
//         </IndexTable>
//       </Card>
//     </AppProvider>
//   );
// }

// describe.only("Sample polaris table component", () => {
//   it("should render", async () => {
//     const wrapper = mount(<SimpleIndexTableExample />);
//     expect(wrapper).toContainReactComponentTimes(IndexTable.Row, 3);

//     const table = wrapper.find(IndexTable);
//     table.trigger("onSelectionChange", "single", true, "1020");

//     const text = wrapper.find(Text, {
//       as: "p",
//     });

//     expect(text).toContainReactText("Selected: 1");
//   });
// });

// describe("Sample polaris table component with testing-library", () => {
//   it("should render", async () => {
//     rtlRender(<SimpleIndexTableExample />);

//     const firstRow = screen.getByText("#1020");

//     await userEvent.click(firstRow);

//     screen.getByText("Selected: 1");
//   });
// });
import {
  AppProvider,
  Badge,
  IndexTable,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import { mount } from "@shopify/react-testing";
import { render as rtlRender, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

// Mock window.matchMedia
// @ts-ignore
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

function SimpleIndexTableExample() {
  const orders = [
    {
      id: "1020",
      order: "#1020",
      date: "Jul 20 at 4:34pm",
      customer: "Jaydon Stanton",
      total: "$969.44",
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: "1019",
      order: "#1019",
      date: "Jul 20 at 3:46pm",
      customer: "Ruben Westerfelt",
      total: "$701.19",
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: "1018",
      order: "#1018",
      date: "Jul 20 at 3.44pm",
      customer: "Leo Carder",
      total: "$798.24",
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <AppProvider i18n={enTranslations}>
      <Text id="1020" as="p">
        Selected
      </Text>
    </AppProvider>
  );
}

describe("Sample polaris table component", () => {
  it("should render", async () => {
    const text = mount(<SimpleIndexTableExample />).find(Text, {
      id: "1020",
      children: "Selected",
    });
    // console.log(wrapper.debug());

    expect(text).toContainReactText("Selected");
  });
});

describe("Sample polaris table component with testing-library", () => {
  it("should render", async () => {
    rtlRender(<SimpleIndexTableExample />);

    console.log(window.dispatchEvent(new Event("click")));

    // const firstRow = screen.getByText("#1020");

    // await userEvent.click(firstRow);

    // screen.getByText("Selected: 1");
  });
});
