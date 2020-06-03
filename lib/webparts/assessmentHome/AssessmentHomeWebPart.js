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
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'AssessmentHomeWebPartStrings';
import AssessmentHome from './components/AssessmentHome';
import { sp } from '@pnp/sp';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
var AssessmentHomeWebPart = /** @class */ (function (_super) {
    __extends(AssessmentHomeWebPart, _super);
    function AssessmentHomeWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AssessmentHomeWebPart.prototype.onInit = function () {
        sp.setup({
            spfxContext: this.context
        });
        return Promise.resolve();
    };
    AssessmentHomeWebPart.prototype.render = function () {
        var element = React.createElement(AssessmentHome, {
            description: this.properties.description,
            context: this.context,
            selectedList: this.properties.lists,
            assessmentList: this.properties.assessmentList,
            userAssessmentList: this.properties.userAssessmentList
        });
        ReactDom.render(element, this.domElement);
    };
    AssessmentHomeWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(AssessmentHomeWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AssessmentHomeWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyFieldListPicker('lists', {
                                    label: 'Select user training list',
                                    selectedList: this.properties.lists,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'listPickerFieldId'
                                }),
                                PropertyFieldListPicker('assessmentList', {
                                    label: 'Select assessment master list',
                                    selectedList: this.properties.assessmentList,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'listPickerFieldId2'
                                }),
                                PropertyPaneTextField('description', {
                                    label: "Assessment URL",
                                    value: ""
                                }),
                                PropertyFieldListPicker('userAssessmentList', {
                                    label: 'Select a userAssessment List',
                                    selectedList: this.properties.userAssessmentList,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'listPickerFieldId'
                                }),
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return AssessmentHomeWebPart;
}(BaseClientSideWebPart));
export default AssessmentHomeWebPart;
//# sourceMappingURL=AssessmentHomeWebPart.js.map