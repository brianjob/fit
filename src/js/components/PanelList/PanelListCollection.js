import React from "react";
import { Grid, Row } from "react-bootstrap";
import PanelList from "./PanelList";

export default class PanelListCollection extends React.Component {

    render() {
        const lg = this.props.lg || 3;
        const md = this.props.md || 4;
        const sm = this.props.sm || 6;
        const xs = this.props.xs || 12;
        const colSizes = {xs, sm, md, lg};

        const panels = this.props.panelLists.map((x,i) => <PanelList removePanel={x.removePanel} addNew={x.addNew} key={i} colSizes={colSizes} header={x.header} listItems={x.listItems} tableRows={x.tableRows}/>);

        return (
            <Grid>
                <Row>
                    {panels}
                </Row>
            </Grid>
        );
    }
}