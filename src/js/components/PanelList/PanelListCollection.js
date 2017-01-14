import React from "react";
import { Grid, Row } from "react-bootstrap";
import PanelList from "./PanelList";

export default class PanelListCollection extends React.Component {

    render() {
        const lg = this.props.colSizeLg || 3;
        const md = this.props.colSizeMd || 6;
        const sm = this.props.colSizeSm || 1;
        const colSizes = {sm, md, lg};

        const panels = this.props.panelLists.map((x,i) => <PanelList key={i} colSizes={colSizes} header={x.header} listItems={x.listItems} tableRows={x.tableRows}/>);

        return (
            <Grid>
                <Row>
                    {panels}
                </Row>
            </Grid>
        );
    }
}