<script lang="ts" setup>
import type { VbenFormSchema } from "@vben/common-ui";
import type { Recordable } from "@vben/types";

import { computed, markRaw, useTemplateRef } from "vue";

import { AuthenticationLogin, SliderCaptcha, z } from "@vben/common-ui";
import { $t } from "@vben/locales";

import { useAuthStore } from "#/store";

defineOptions({ name: "Login" });

const authStore = useAuthStore();

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: "VbenInput",
      componentProps: {
        placeholder: $t("authentication.usernameTip")
      },
      fieldName: "username",
      defaultValue: "admin",
      label: $t("authentication.username"),
      rules: z.string().min(1, { message: $t("authentication.usernameTip") })
    },
    {
      component: "VbenInputPassword",
      componentProps: {
        placeholder: $t("authentication.password")
      },
      fieldName: "password",
      defaultValue: "123456",
      label: $t("authentication.password"),
      rules: z.string().min(1, { message: $t("authentication.passwordTip") })
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: "captcha",
      rules: z.boolean().refine((value) => value, {
        message: $t("authentication.verifyRequiredTip")
      })
    }
  ];
});

const loginRef =
  useTemplateRef<InstanceType<typeof AuthenticationLogin>>("loginRef");

async function onSubmit(params: Recordable<any>) {
  authStore.authLogin(params).catch(() => {
    // 登陆失败，刷新验证码的演示
    const formApi = loginRef.value?.getFormApi();
    // 重置验证码组件的值
    formApi?.setFieldValue("captcha", false, false);
    // 使用表单API获取验证码组件实例，并调用其resume方法来重置验证码
    formApi
      ?.getFieldComponentRef<InstanceType<typeof SliderCaptcha>>("captcha")
      ?.resume();
  });
}
</script>

<template>
  <AuthenticationLogin
    ref="loginRef"
    :title="$t('authentication.welcomeBack')"
    :form-schema="formSchema"
    :show-qrcode-login="false"
    :show-code-login="false"
    :show-third-party-login="false"
    :loading="authStore.loginLoading"
    @submit="onSubmit"
  />
</template>
