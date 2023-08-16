<template>
  <div :class="$style['layout']">
    <PageHeader />
    <main :class="$style['layout__main']">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>

<style module>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.layout__main {
  flex: 1 1 auto;
}
</style>
