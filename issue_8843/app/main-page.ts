/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page } from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';
import { Observable } from "tns-core-modules/data/observable";
import { TimePicker } from "tns-core-modules/ui/time-picker";

// Event handler for Page 'navigatingTo' event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    const page = <Page>args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
   const vm = new Observable();
    vm.set("tphour", 16);
    vm.set("tpminute", 15);
    vm.set("tpMaxHour", 18);
    vm.set("tpMaxMinute", 48);
    vm.set("tpMinHour", 10);
    vm.set("tpMinMinute", 10);
    vm.set("tpminuteInterval", 15);
    vm.set("timeResult", "_");

    page.bindingContext = vm;
}

export function onPickerLoaded(eventData) {
    const timePicker: TimePicker = <TimePicker>eventData.object;
    // handling 'time change' via code behind
    timePicker.on("timeChange", (args: any) => {
        // args is of type PropertyChangeData
        console.log("Picked TIME: ", args.value);

        const page = args.object.page;
        const vm = page.bindingContext;
        vm.set("timeResult", args.value);
    });
}
