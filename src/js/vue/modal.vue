<template lang="html" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <!-- Modal Template -->
    <script type="text/x-template" id="modal-template">
        <transition name="modal">
            <div class="modal-mask" @click="$emit('close')" >
                <div class="modal-wrapper">
                    <div class="modal-container" @click.stop >

                        <div class="modal-header">
                            <slot name="header">
                            </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </script>
</template>