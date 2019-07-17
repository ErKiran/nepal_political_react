import React, { Component } from 'react';
import { Nepal } from 'nepal_political';
import SelectListGroup from './utils/SelectListGroup';
import Introduction from './Introduction';


class NepalPolitical extends Component {
    constructor() {
        super();
        this.state = {
            state: '',
            localBody: '',
            district: '',
            localgovname: ''
        };
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div>
                <form className="form-inline">
                    <div className="container">
                        <h1 className="text-danger">Nepal Political</h1>
                        <div className="text-center">
                            <div className="form-group">
                                <SelectListGroup
                                    placeholder="State*"
                                    name="state"
                                    type="text"
                                    onChange={this.onChange}
                                    value={this.state.state}
                                    options={Nepal.Province()}
                                    info="Choose the state"
                                />
                            </div>
                            <div className="form-group">
                                <SelectListGroup
                                    placeholder="District*"
                                    name="district"
                                    type="text"
                                    value={this.state.district}
                                    onChange={this.onChange}
                                    options={Nepal.DistrictByProvince(this.state.state)}
                                    info="Choose the District"
                                />
                            </div>
                            <div className="form-group">
                                <SelectListGroup
                                    placeholder="Type of Local Bodies*"
                                    name="localBody"
                                    type="text"
                                    value={this.state.localBody}
                                    onChange={this.onChange}
                                    options={Nepal.LocalBodiesByDistrict(this.state.district)}
                                    info="Choose the District"
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <Introduction />
            </div>
        );
    }
}

export default NepalPolitical;