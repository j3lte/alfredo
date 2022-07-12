export enum ScriptItemType {
  Default = "default",
  File = "file",
  FileSkipCheck = "file:skipcheck",
}

export type IconType = "fileicon" | "filetype";

export type ActionType = {
  text?: string | string[];
  url?: string;
  file?: string;
  auto?: string;
};

/**
 * ScriptItem format
 *
 * See [Alfredapp docs](https://www.alfredapp.com/help/workflows/inputs/script-filter/json/#helparticle)
 */
export interface ScriptItem {
  /**
   * **(optional)** Unique identifier for the item
   *
   * _This is a unique identifier for the item which allows help Alfred to learn about this item for subsequent sorting and ordering of the user's actioned results._
   *
   * _It is important that you use the same UID throughout subsequent executions of your script to take advantage of Alfred's knowledge and sorting. If you would like Alfred to always show the results in the order you return them from your script, exclude the UID field._
   *
   * _If you would like to control the order of the results and have Alfred present the items in the exact order you return them from your script, **exclude the UID attribute**_
   */
  uid?: string;
  /**
   * **(optional, default = "default")**
   *
   * _By specifying "type": "file", this makes Alfred treat your result as a file on your system. This allows the user to perform actions on the file like they can with Alfred's standard file filters._
   *
   * _When returning files, Alfred will check if the file exists before presenting that result to the user. This has a very small performance implication but makes the results as predictable as possible. If you would like Alfred to skip this check as you are certain that the files you are returning exist, you can use "type": "file:skipcheck"._
   */
  type?: ScriptItemType;
  /**
   * The title displayed in the result row. There are no options for this element and it is essential that this element is populated.
   */
  title: string;
  /**
   * **(optional)** The subtitle displayed in the result row. This element is optional.
   */
  subtitle?: string;
  /**
   * **(recommended)** The argument which is passed through the workflow to the connected output action.
   *
   * _While the arg attribute is optional, it's highly recommended that you populate this as it's the string which is passed to your connected output actions. If excluded, you won't know which result item the user has selected._
   */
  arg?: string | number | string[];
  /**
   * **(optional, default = true)** If this item is valid or not.
   *
   * _If an **item** is valid then Alfred will action this **item** when the user presses return. If the **item** is not valid, Alfred will do nothing. This allows you to intelligently prevent Alfred from actioning a result based on the current {query} passed into your script._
   */
  valid?: boolean;
  /**
   * **(optional)**
   *
   * _From Alfred 3.5, the match field enables you to define what Alfred matches against when the workflow is set to "Alfred Filters Results". If match is present, it fully replaces matching on the title property._
   *
   * _Note that the match field is always treated as case insensitive, and intelligently treated as diacritic insensitive. If the search query contains a diacritic, the match becomes diacritic sensitive._
   */
  match?: string | null;
  /**
   * **(recommended)**
   *
   * _An optional but recommended string you can provide which is populated into Alfred's search field if the user auto-complete's the selected result (⇥ by default)._
   *
   * _If the item is set as "valid": false, the auto-complete text is populated into Alfred's search field when the user actions the result._
   */
  autocomplete?: string;
  /**
   * The icon displayed in the result row. Workflows are run from their workflow folder, so you can reference icons stored in your workflow relatively.
   *
   * _By omitting the ```type```, Alfred will load the file path itself, for example a png. By using ```type```: ```fileicon```, Alfred will get the icon for the specified path. Finally, by using ```type```: ```filetype```, you can get the icon of a specific file, for example ```path```: ```"public.png"```_
   */
  icon?: {
    type?: IconType;
    path: string;
  };
  /**
   * **(optional)**
   *
   * _The mod element gives you control over how the modifier keys react. You can now define the valid attribute to mark if the result is valid based on the modifier selection and set a different arg to be passed out if actioned with the modifier._
   *
   * _From Alfred 3.4.1, you can define an icon and variables for each object in the mods object._
   */
  mods?: {
    [key: string]: Pick<
      ScriptItem,
      "valid" | "arg" | "subtitle" | "icon" | "variables"
    >;
  };
  /**
   * **(optional)**
   *
   * _This element defines the Universal Action items used when actioning the result, and overrides arg being used for actioning. The action key can take a string or array for simple types', and the content type will automatically be derived by Alfred to file, url or text._
   */
  action?: string | string[] | ActionType;
  /**
   * **(optional)**
   *
   * _The text element defines the text the user will get when copying the selected result row with ⌘C or displaying large type with ⌘L._
   *
   * _If these are not defined, you will inherit Alfred's standard behaviour where the arg is copied to the Clipboard or used for Large Type._
   */
  text?: {
    copy: string;
    largetype: string;
  };
  /**
   * **(optional)**
   *
   * _A Quick Look URL which will be visible if the user uses the Quick Look feature within Alfred (tapping shift, or ⌘Y). Note that quicklookurl will also accept a file path, both absolute and relative to home using ~/._
   */
  quicklookurl?: string;
  /**
   * **(optional)**
   *
   * > Note: Be careful, you are passing these variables as an Environment variable to the next step
   *
   * _From Alfred 3.4.1, individual item objects can also have variables which are passed out of the Script Filter object if the associated Result Item is selected in Alfred's results list. variables set within an item will override any JSON session variables of the same name._
   */
  variables?: {
    [key: string]: unknown;
  };
}

export interface ScriptOutput {
  /**
   * Items
   */
  items: ScriptItem[];
  /**
   * Rerun automatically after an interval
   *
   * Should be between ```0.1``` and ```5.0```
   */
  rerun?: number;
}
