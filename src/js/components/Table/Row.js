import React from "react";

export default class Row extends React.Component {

    render() {
        const cells = this.props.cells.map((x,i) => <td key={i}>{x}</td>);

        return (
            <tr>
            {cells}
            </tr>
        )
    }
}