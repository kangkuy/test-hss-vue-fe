<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      |
      <RouterLink to="/about">About</RouterLink>
      |
      <RouterLink to="/login">Login</RouterLink>
      |
      <RouterLink to="/prompt">Prompt AI</RouterLink>
      |
      <RouterLink to="/task">Task</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>INI FOOTER</footer>
</template>
