<template>
    <div :class="alert" role="alert">
         {{ notif }}
    </div>
</template>

<script>
export default {
    props: ['notif', 'alert']
}
</script>

