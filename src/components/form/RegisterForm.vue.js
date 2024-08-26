var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { reactive, ref, watch } from 'vue';
import api from '@/services/api';
export default (await import('vue')).defineComponent({
    name: 'RegisterForm',
    setup() {
        const form = reactive({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            phoneNumber: '',
            role: '',
            birthDate: '',
            document: null,
            verified: false,
            //recaptchaToken: '', // Token per reCAPTCHA
        });
        const confirmPassword = ref('');
        const roles = ['USER', 'ADMIN'];
        const valid = ref(false);
        //const recaptchaSiteKey = '6Lde0S8qAAAAAMoqacl7jAhkj6nbbakPWMVTuq8J';
        watch([form, confirmPassword], () => {
            valid.value = validateForm();
        }, { deep: true });
        const validateForm = () => {
            return !!form.firstName && !!form.lastName && !!form.email && !!form.username &&
                !!form.password && confirmPassword.value === form.password &&
                !!form.phoneNumber && !!form.role && !!form.birthDate && !!form.document;
        };
        const handleFileUpload = (event) => {
            var _a;
            const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                form.document = file;
            }
        };
        /*
        const onVerify = (recaptchaToken: string) => {
          form.recaptchaToken = recaptchaToken;
        }; */
        const submit = () => __awaiter(this, void 0, void 0, function* () {
            if (valid.value) {
                try {
                    const formData = new FormData();
                    formData.append('firstName', form.firstName);
                    formData.append('lastName', form.lastName);
                    formData.append('email', form.email);
                    formData.append('username', form.username);
                    formData.append('password', form.password);
                    formData.append('phoneNumber', form.phoneNumber);
                    formData.append('role', form.role);
                    formData.append('birthDate', form.birthDate);
                    if (form.document) {
                        formData.append('document', form.document);
                    }
                    formData.append('verified', 'false');
                    // formData.append('recaptchaToken', form.recaptchaToken);
                    const response = yield api.register(formData);
                    console.log('Respuesta del servidor:', response.data);
                }
                catch (error) {
                    console.error('Error al enviar el formulario:', error);
                }
            }
            else {
                console.error('Formulario no válido');
            }
        });
        return {
            form,
            confirmPassword,
            roles,
            valid,
            //recaptchaSiteKey,
            handleFileUpload,
            //onVerify,
            submit,
        };
    },
});
;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("flex items-center justify-center min-h-screen bg-gray-100") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("w-full max-w-lg p-8 bg-white rounded-lg shadow-lg") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: ("text-2xl font-bold text-center mb-6") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)(Object.assign({ onSubmit: (__VLS_ctx.submit) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("firstName") }, { class: ("block text-sm font-medium text-gray-700") }));
    // @ts-ignore
    [submit,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("firstName"), value: ((__VLS_ctx.form.firstName)), type: ("text"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    // @ts-ignore
    [form,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("lastName") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("lastName"), value: ((__VLS_ctx.form.lastName)), type: ("text"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    // @ts-ignore
    [form,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("email") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("email"), type: ("email"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    (__VLS_ctx.form.email);
    // @ts-ignore
    [form,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("username") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("username"), value: ((__VLS_ctx.form.username)), type: ("text"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    // @ts-ignore
    [form,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("password") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("password"), type: ("password"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    (__VLS_ctx.form.password);
    // @ts-ignore
    [form,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("confirmPassword") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("confirmPassword"), type: ("password"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    (__VLS_ctx.confirmPassword);
    // @ts-ignore
    [confirmPassword,];
    if (__VLS_ctx.form.password !== __VLS_ctx.confirmPassword && __VLS_ctx.confirmPassword !== '') {
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: ("text-red-500 text-sm mt-2") }));
        // @ts-ignore
        [form, confirmPassword, confirmPassword,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("phoneNumber") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("phoneNumber"), value: ((__VLS_ctx.form.phoneNumber)), type: ("text"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    // @ts-ignore
    [form,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("role") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)(Object.assign({ id: ("role"), value: ((__VLS_ctx.form.role)), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    for (const [role] of __VLS_getVForSourceType((__VLS_ctx.roles))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({ key: ((role)), value: ((role)), });
        (role);
        // @ts-ignore
        [form, roles,];
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("birthDate") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign({ id: ("birthDate"), type: ("date"), required: (true) }, { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    (__VLS_ctx.form.birthDate);
    // @ts-ignore
    [form,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: ("mb-4") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)(Object.assign({ for: ("document") }, { class: ("block text-sm font-medium text-gray-700") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)(Object.assign(Object.assign({ onChange: (__VLS_ctx.handleFileUpload) }, { id: ("document"), type: ("file") }), { class: ("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") }));
    // @ts-ignore
    [handleFileUpload,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ type: ("submit"), disabled: ((!__VLS_ctx.valid)) }, { class: ("w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm") }));
    // @ts-ignore
    [valid,];
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['flex'];
        __VLS_styleScopedClasses['items-center'];
        __VLS_styleScopedClasses['justify-center'];
        __VLS_styleScopedClasses['min-h-screen'];
        __VLS_styleScopedClasses['bg-gray-100'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['max-w-lg'];
        __VLS_styleScopedClasses['p-8'];
        __VLS_styleScopedClasses['bg-white'];
        __VLS_styleScopedClasses['rounded-lg'];
        __VLS_styleScopedClasses['shadow-lg'];
        __VLS_styleScopedClasses['text-2xl'];
        __VLS_styleScopedClasses['font-bold'];
        __VLS_styleScopedClasses['text-center'];
        __VLS_styleScopedClasses['mb-6'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['text-red-500'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['mb-4'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['text-sm'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-gray-700'];
        __VLS_styleScopedClasses['mt-1'];
        __VLS_styleScopedClasses['block'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-3'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['border'];
        __VLS_styleScopedClasses['border-gray-300'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['focus:border-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
        __VLS_styleScopedClasses['w-full'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-2'];
        __VLS_styleScopedClasses['font-medium'];
        __VLS_styleScopedClasses['text-white'];
        __VLS_styleScopedClasses['bg-indigo-600'];
        __VLS_styleScopedClasses['rounded-md'];
        __VLS_styleScopedClasses['shadow-sm'];
        __VLS_styleScopedClasses['hover:bg-indigo-700'];
        __VLS_styleScopedClasses['focus:outline-none'];
        __VLS_styleScopedClasses['focus:ring-2'];
        __VLS_styleScopedClasses['focus:ring-offset-2'];
        __VLS_styleScopedClasses['focus:ring-indigo-500'];
        __VLS_styleScopedClasses['sm:text-sm'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    const __VLS_name = 'RegisterForm';
    let __VLS_internalComponent;
}
