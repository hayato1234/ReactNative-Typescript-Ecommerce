import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import { Card } from "@rneui/base";
import { DataTable } from "react-native-paper";

export default class About extends Component {
  static navigationOptions = {
    title: "About Us",
  };

  render() {
    return (
      <ScrollView>
        <Mission />
        <Points />
        <Company />
        <Facts />
      </ScrollView>
    );
  }
}

function Mission() {
  return (
    <Card>
      <Card.Title>Our Mission</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        We believe that electronics should be used much longer just like
        furniture. According to the research, 40% of electronics that are thrown
        away in the United States can be reused with an easy and inexpensive
        repair. We could significantly reduce the bad impact on the environment
        by extending the life of electronics.
      </Text>
    </Card>
  );
}

function Points() {
  return (
    <Card>
      <Card.Title>RE Green points and NTFs</Card.Title>
      <Card.Divider />
      <Text>
        You get RE Green points for buying, offering and donating items. You can
        use the points to purchase our items or NFT tokens. Our NFT tokens are
        managed by 100% renewable resources.
      </Text>
    </Card>
  );
}

function Company() {
  return (
    <Card>
      <Card.Title>Our company</Card.Title>
      <DataTable>
        <DataTable.Row>
          <DataTable.Title>Founded</DataTable.Title>
          <DataTable.Cell>December 3, 2020</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Title>Item sold in 2021</DataTable.Title>
          <DataTable.Cell>342</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Title>Items repaired in 2021</DataTable.Title>
          <DataTable.Cell>446</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Title>Employees</DataTable.Title>
          <DataTable.Cell>3</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </Card>
  );
}

function Facts() {
  return (
    <Card>
      <Card.Title>Facts &amp; Figures</Card.Title>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Area</DataTable.Title>
          <DataTable.Title>E-waste (tons)</DataTable.Title>
          <DataTable.Title>Per household</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>In the US</DataTable.Cell>
          <DataTable.Cell>2.57 million</DataTable.Cell>
          <DataTable.Cell>10 lb.</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>World</DataTable.Cell>
          <DataTable.Cell>2.7 billion</DataTable.Cell>
          <DataTable.Cell>1.4 lb.</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </Card>
  );
}
