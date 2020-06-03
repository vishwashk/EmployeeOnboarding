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
import * as strings from 'TrainingWebPartStrings';
import Training from './components/Training';
import { sp } from '@pnp/sp';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
var TrainingWebPart = /** @class */ (function (_super) {
    __extends(TrainingWebPart, _super);
    function TrainingWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TrainingWebPart.prototype.onInit = function () {
        sp.setup({
            spfxContext: this.context
        });
        if (this.properties.moduleSubmittionMsg === undefined) {
            this.properties.moduleSubmittionMsg = '<p>Click "OK", to submit the module (Link to documents will be disabled post submission)</p><p>Click "Cancel", to return to module training.</p>';
        }
        if (this.properties.moduleCompletionMsg === undefined) {
            this.properties.moduleCompletionMsg = 'Would you like to take the assessment now?';
        }
        if (this.properties.URLForYes === undefined) {
            this.properties.URLForYes = window.location.href;
        }
        if (this.properties.URLForNo === undefined) {
            this.properties.URLForNo = window.location.href;
        }
        return Promise.resolve();
    };
    TrainingWebPart.prototype.render = function () {
        var element = React.createElement(Training, {
            context: this.context,
            selectedList: this.properties.lists,
            displayMode: this.displayMode,
            configured: (this.properties.lists && this.properties.userAssessment && this.properties.userTraining) ? true : false,
            userAssessment: this.properties.userAssessment,
            userTraining: this.properties.userTraining,
            moduleSubmittionMsg: this.properties.moduleSubmittionMsg,
            moduleCompletionMsg: this.properties.moduleCompletionMsg,
            URLForYes: this.properties.URLForYes,
            URLForNo: this.properties.URLForNo
        });
        ReactDom.render(element, this.domElement);
    };
    TrainingWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(TrainingWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    TrainingWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                    label: 'Select a training master list',
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
                                PropertyFieldListPicker('userAssessment', {
                                    label: 'Select a UserAssessment',
                                    selectedList: this.properties.userAssessment,
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
                                PropertyFieldListPicker('userTraining', {
                                    label: 'Select a UserTraining',
                                    selectedList: this.properties.userTraining,
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
                                PropertyPaneTextField('moduleSubmittionMsg', {
                                    label: 'Module submittion message',
                                    value: this.properties.moduleSubmittionMsg
                                }),
                                PropertyPaneTextField('moduleCompletionMsg', {
                                    label: 'Module completion message.',
                                    value: this.properties.moduleCompletionMsg
                                }),
                                PropertyPaneTextField('URLForYes', {
                                    label: 'URL for Yes',
                                    value: this.properties.URLForYes
                                }),
                                PropertyPaneTextField('URLForNo', {
                                    label: 'URL for No',
                                    value: this.properties.URLForNo
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return TrainingWebPart;
}(BaseClientSideWebPart));
export default TrainingWebPart;
//# sourceMappingURL=TrainingWebPart.js.map