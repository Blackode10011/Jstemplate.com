<template>
  <div h-full w-full font-sans grid="~ lt-lg:rows-[1fr_max-content] lg:cols-[max-content_1fr]" of-hidden>
    <div of-auto relative>
      <slot />
    </div>
    <NavBar lg:order-first />
    <IframeModal />
    <PhotoModal />
  </div>
</template>
