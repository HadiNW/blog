<template>
    <div class="container mt-4">
         <Form></Form>
    </div>   
</template>

<script>
export default {
    components: {
        Form: () => import('@/components/FormRegister')
    }
}
</script>

