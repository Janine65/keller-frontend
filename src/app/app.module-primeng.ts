// ===========================================================================
// File: APP.MODULE-PRIMENG.ts
import { SharedModule, Header, Footer, ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { SelectModule } from 'primeng/select';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { DatePickerModule } from 'primeng/datepicker';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { PasswordModule } from 'primeng/password';
import { DrawerModule } from 'primeng/drawer';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { FieldsetModule } from 'primeng/fieldset';
import { DataViewModule } from 'primeng/dataview'
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitterModule } from 'primeng/splitter';
import { TextareaModule } from 'primeng/textarea';
import { StyleClassModule } from 'primeng/styleclass';
import { AutoFocusModule } from 'primeng/autofocus';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { ImageModule } from 'primeng/image';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
//
export const APP_PRIMENG_MODULE = [
    AccordionModule,
    AutoFocusModule,
    BadgeModule,
    ButtonModule,
    DatePickerModule,
    CheckboxModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    SelectModule,
    DynamicDialogModule,
    FieldsetModule,
    FileUploadModule,
    FocusTrapModule,
    IconFieldModule,
    ImageModule,
    InputIconModule,
    InputNumberModule,
    ToggleSwitchModule,
    TextareaModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    MessageModule,
    MultiSelectModule,
    PanelModule,
    PasswordModule,
    ProgressBarModule,
    RadioButtonModule,
    RippleModule,
    ScrollPanelModule,
    SelectButtonModule,
    SharedModule,
    DrawerModule,
    SplitterModule,
    StyleClassModule,
    TableModule,
    TabsModule,
    TagModule,
    ToastModule,
    ToolbarModule,
    ToggleButtonModule,
    TreeModule,
    TreeTableModule,
];
//
export const APP_PRIMENG_COMPONENTS = [
    Dialog,
    ConfirmDialog,
    Header,
    Footer
];
//
//
export const APP_PRIMENG_PROVIDERS = [
    ConfirmationService,
    { provide: MessageService, useClass: MessageService },

];
// ===========================================================================