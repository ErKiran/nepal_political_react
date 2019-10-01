import React, { Component } from 'react';
import { Nepal } from 'nepal_political';
import SelectListGroup from './utils/SelectListGroup';
import Introduction from './Introduction';
import { get_Local_Name } from './utils/helper';

class NepalPolitical extends Component {
    constructor() {
        super();
        this.state = {
            state: '',
            localBody: '',
            localBodyOption: [],
            district: '',
            districtOpts: [],
            localGovOptions: [],
            localgovname: '',
            previousState: '',
            previousDistrict: '',
            previousLocBodyName: '',
            previousLocalBody: ''
        };
    }
    detectStateChange() {
        if (this.state.state !== this.state.previousState) {
            const current = this.state.districtOpts;
            const correctCurrent = Nepal.DistrictByProvince(this.state.state);
            const check = JSON.stringify(current) === JSON.stringify(correctCurrent);
            if (check === false) {
                const districtOptions = Nepal.DistrictByProvince(this.state.state);
                this.setState({ districtOpts: districtOptions });
                this.setState({ district: districtOptions[0] })
            }
            if (this.state.districtOpts.length === 0) {
                this.setState({ districtOpts: Nepal.DistrictByProvince(this.state.state) })
            }
        }
    }
    detectDistrictChange() {
        if (this.state.district !== this.state.previousDistrict) {
            const current = this.state.localBodyOption;
            const correctCurrent = Nepal.LocalBodiesByDistrict(this.state.district)[0];
            const check = JSON.stringify(current) === JSON.stringify(correctCurrent);
            if (check === false) {
                this.setState({ localBodyOption: Nepal.LocalBodiesByDistrict(this.state.district)[0] })
                this.setState({ localBody: Nepal.LocalBodiesByDistrict(this.state.district)[0][0] })
            }
            if (this.state.localBodyOption.length === 0) {
                this.setState({ localBodyOption: Nepal.LocalBodiesByDistrict(this.state.district)[0] })
            }
        }
    }
    detectLocalBodyChange() {
        if (this.state.previousLocalBody !== this.state.localBody) {
            const current = this.state.localGovOptions;
            const correctCurrent = get_Local_Name(this.state.localBody, Nepal, this.state.district)
            const check = JSON.stringify(current) === JSON.stringify(correctCurrent);
            if (check === false) {
                this.setState({ localGovOptions: correctCurrent });
                this.setState({ localgovname: correctCurrent[0] })
            }
        }

    }
    componentDidUpdate() {
        this.detectStateChange()
        this.detectDistrictChange()
        this.detectLocalBodyChange()
    }

    componentDidMount() {
        if (this.state.state === '') {
            this.setState({ state: 'Province No. 1' })
        }
    }


    onChange = (e) => {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value });
        this.setState({
            previousState: this.state.state,
            previousDistrict: this.state.district,
            previousLocBodyName: this.state.previousLocBodyName,
            previousLocalBody: this.state.previousLocalBody,
        })
    }
    render() {
        console.log(this.state)
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
                                    options={this.state.districtOpts}
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
                                    options={this.state.localBodyOption}
                                    info="Choose the Local Bodies Type"
                                />
                            </div>
                            <div className="form-group">
                                <SelectListGroup
                                    placeholder="Name of Local Goverment*"
                                    name="localgovname"
                                    type="text"
                                    value={this.state.localgovname}
                                    onChange={this.onChange}
                                    options={this.state.localGovOptions}
                                    info="Choose the Local Goverment Name"
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