import React from "react";
import Input from "./Input";
import {Grid,Row,Col, Button} from "react-bootstrap";

export default class FitForm extends React.Component {
    render() {
        const form = {
            title: "New Workout",
            onSubmit: function() {
                alert('form submitted');
            },
            fields: [
                {
                    type: 'text',
                    label: 'text',
                    defaultValue: 'sample',
                    id: 'textId'
                },
                {
                    type: 'password',
                    label: 'password',
                    placeholder: 'password'
                },
                {
                    id: 'date',
                    type: 'date',
                    defaultValue: '2017-01-03T17:00:00.000Z',
                    label: 'date'
                },
                {
                    id: 'movement',
                    type: 'select',
                    label: 'options',
                    options: [
                        {
                            display: 'low bar squat',
                            value: 'low-bar-squat'
                        },
                        {
                            display: 'high bar squat',
                            value: 'high-bar-squat'
                        },
                        {
                            display: 'bench press',
                            value: 'bench-press'
                        },
                        {
                            display: 'overhead press',
                            value: 'overhead-press'
                        },
                        {
                            display: 'deadlift',
                            value: 'deadlift'
                        },
                        {
                            display: 'power clean',
                            value: 'power-clean'
                        }
                    ]
                },
                {
                    id: 'file',
                    type: 'file',
                    label: 'file'
                }
            ]
        };

        var inputs = form.fields.map((x,i) => <Input data={x} key={i} />)

        return (
            <Grid>
            <Row>
            <Col lg={this.props.widthLg || 12} md={this.props.widthMd || 12} sm={this.props.widthSm || 12} xs={this.props.widthXs || 12}>
                <h2>{form.title}</h2>
                <form>
                    {inputs}
                    <Button>Submit</Button>
                </form>
            </Col>
            </Row>
            </Grid>
        );
    }
}