<template>
  <div style="display: flex; flex-direction: column">
    <h1>Playground</h1>
    <pre>Cookie {{ contextId }}</pre>
    <input
      v-model="contextId"
      type="text"
      autocomplete="context-id"
      aria-label="Context Id"
      placeholder="Context Id"
    />
    <button @click="onClick">Click</button>
    <div v-if="data">
      <h2>Async Data</h2>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
const contextId = useCookie('context-id', {
  domain: 'localhost',
})

const { data, refresh } = await useAsyncData('pipoca', async () => {
  if (!contextId.value) {
    contextId.value = 'd0eu'
  }

  const data = await $fetch('/api/pamonha', {
    method: 'POST',
  })

  console.log('data')

  return data
})

const onClick = () => {
  console.log('Clicou', contextId.value)

  refresh()
}

onMounted(() => {
  console.log('Mounted', contextId.value)
})
</script>
