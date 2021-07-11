import React, {Fragment} from 'react';
import {Header, Table, TableBody, TableCell, TableRow} from "semantic-ui-react";
import {connect} from "react-redux";

const Bylaws = ({amendments}) => {
  return (
    <Fragment>
      <Header as="h2">Bylaws</Header>
      <Table>
        <TableBody>
          {amendments.map(a => (
            <TableRow key={a.amendmentNum}>
              <TableCell>#{a.amendmentNum}: {a.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  amendments: state.cvr.catanstitution.amendments
});

export default connect(mapStateToProps)(Bylaws);
