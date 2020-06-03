var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './AssessmentHome.module.scss';
import { SPDataOperations } from '../../../common/SPDataOperations';
import { PrimaryButton } from 'office-ui-fabric-react';
var AssessmentHome = /** @class */ (function (_super) {
    __extends(AssessmentHome, _super);
    function AssessmentHome(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            moduleAssessment: [],
            assessmentStatus: ''
        };
        return _this;
    }
    AssessmentHome.prototype.componentDidMount = function () {
        var _this = this;
        SPDataOperations.LOADCurrentUserAssessment(this.props.selectedList, this.props.assessmentList, 1, this.props.context.pageContext.user.email, this.props.userAssessmentList).then(function (assessment) {
            _this.setState({ moduleAssessment: assessment.assessmentData });
            if (assessment.assessmentData.length === 0) {
                _this.setState({ assessmentStatus: 'You have no assessment pending!' });
            }
        });
    };
    AssessmentHome.prototype.render = function () {
        return (React.createElement("div", { className: styles.assessmentHome },
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    this.state.moduleAssessment.length > 0 &&
                        React.createElement(PrimaryButton, { href: this.props.description }, "Start Assessment"),
                    (this.state.moduleAssessment.length === 0 && this.state.assessmentStatus !== '') &&
                        React.createElement("div", { style: { textAlign: "center" } },
                            React.createElement("img", { style: { width: 'auto' }, src: "/sites/ROOT/RootAssets/Images/Yay.jpg" }),
                            React.createElement("h2", null, this.state.assessmentStatus))))));
    };
    return AssessmentHome;
}(React.Component));
export default AssessmentHome;
//# sourceMappingURL=AssessmentHome.js.map