import React, {Fragment} from 'react';
import {Divider, Grid, GridColumn, Header, Icon, Table, TableBody, TableCell, TableRow} from "semantic-ui-react";
import {connect} from "react-redux";
import AddressLabel from "../AddressLabel";
import CurrentProposalVotes from "./CurrentProposalVotes";
import VoteOnProposalModal from "./VoteOnProposalModal";

const Bylaws = ({amendments, proposals}) => {
  console.info(proposals);
  return (
    <Fragment>
      <Header as="h2"><Icon name="law"/>Bylaws</Header>
      <Table>
        <TableBody>
          {amendments.map(a => (
            <TableRow key={a.amendmentNum}>
              <TableCell>#{a.amendmentNum}: {a.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {proposals.length > 0 &&
      <Fragment>
        <Divider horizontal><Icon name="pencil"/> Proposals</Divider>
        <Table>
          <TableBody>
            {proposals.map(p => (
            <TableRow key={p.amendmentNum}>
              <TableCell>
                <Grid columns={4} verticalAlign="middle">
                  <GridColumn width={9}>#{p.amendmentNum}: {p.text}</GridColumn>
                  <GridColumn width={2}><CurrentProposalVotes amendmentNum={p.amendmentNum}/></GridColumn>
                  <GridColumn width={2}><VoteOnProposalModal amendmentNum={p.amendmentNum} author={p.author} text={p.text}/></GridColumn>
                  <GridColumn width={3} textAlign="right">Proposed by <AddressLabel address={p.author}/></GridColumn>
                </Grid>
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
      }
    </Fragment>
  );
};

const mapStateToProps = state => ({
  amendments: state.catanstitution.catanstitution.amendments,
  proposals: state.catanstitution.proposals
});

export default connect(mapStateToProps)(Bylaws);
