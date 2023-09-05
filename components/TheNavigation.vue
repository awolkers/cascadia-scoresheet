<template>
  <nav>
    <ul :class="$style['the-navigation']">
      <li>
        <NuxtLinkLocale to="/">Home</NuxtLinkLocale>
      </li>
      <li>
        <NuxtLinkLocale to="/history">Game history</NuxtLinkLocale>
      </li>
    </ul>
  </nav>
</template>

<style module>
.the-navigation {
  display: flex;
  padding: 0;
  margin: var(--space-8);
  list-style: none;
  gap: var(--space-8);
}
</style>
