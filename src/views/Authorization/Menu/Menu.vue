<script setup lang="tsx">
import { reactive, ref, unref } from 'vue'
import { getMenuListApi, saveMenuApi, delMenuApi } from '@/api/menu'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ElTag } from 'element-plus'
import { Icon } from '@/components/Icon'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { ContentWrap } from '@/components/ContentWrap'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { BaseButton } from '@/components/Button'
import { ElMessage, ElPopconfirm } from 'element-plus'

const { t } = useI18n()

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const res = await getMenuListApi(searchParams.value)
    return {
      list: res.data || []
    }
  }
})

const { dataList, loading } = tableState
const { getList } = tableMethods

const tableColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('userDemo.index'),
    type: 'index'
  },
  {
    field: 'meta.title',
    label: t('menu.menuName'),
    slots: {
      default: (data: any) => {
        const title = data.row.meta.title
        return <>{title}</>
      }
    }
  },
  {
    field: 'meta.icon',
    label: t('menu.icon'),
    slots: {
      default: (data: any) => {
        const icon = data.row.meta.icon
        if (icon) {
          return (
            <>
              <Icon icon={icon} />
            </>
          )
        } else {
          return null
        }
      }
    }
  },
  // {
  //   field: 'meta.permission',
  //   label: t('menu.permission'),
  //   slots: {
  //     default: (data: any) => {
  //       const permission = data.row.meta.permission
  //       return permission ? <>{permission.join(', ')}</> : null
  //     }
  //   }
  // },
  {
    field: 'component',
    label: t('menu.component'),
    slots: {
      default: (data: any) => {
        const component = data.row.component
        return <>{component === '#' ? '顶级目录' : component === '##' ? '子目录' : component}</>
      }
    }
  },
  {
    field: 'path',
    label: t('menu.path')
  },
  {
    field: 'isActive',
    label: t('menu.status'),
    slots: {
      default: (data: any) => {
        return (
          <>
            <ElTag type={data.row.isActive === '0' ? 'danger' : 'success'}>
              {data.row.isActive === '1' ? t('userDemo.enable') : t('userDemo.disable')}
            </ElTag>
          </>
        )
      }
    }
  },
  {
    field: 'action',
    label: t('userDemo.action'),
    width: 240,
    slots: {
      default: (data: any) => {
        const row = data.row
        return (
          <>
            <BaseButton type="primary" onClick={() => action(row, 'edit')}>
              {t('exampleDemo.edit')}
            </BaseButton>
            <BaseButton type="success" onClick={() => action(row, 'detail')}>
              {t('exampleDemo.detail')}
            </BaseButton>
            <ElPopconfirm title="是否确认删除？" onConfirm={() => delMenu(row)}>
              {{
                reference: () => (
                  <BaseButton type="danger" >{t('exampleDemo.del')}</BaseButton>
                )
              }}
            </ElPopconfirm>
          </>
        )
      }
    }
  }
])

const searchSchema = reactive<FormSchema[]>([
  {
    field: 'title',
    label: t('menu.menuName'),
    component: 'Input'
  }
])

const searchParams = ref({})
const setSearchParams = (data: any) => {
  searchParams.value = data
  getList()
}

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref()
const actionType = ref('')

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)

const action = (row: any, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = row
  dialogVisible.value = true
}

const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = undefined
  dialogVisible.value = true
  actionType.value = ''
}

const save = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    // 保存菜单
    saveMenuApi(formData).then(res => {
      if (res.code == 200) {
        ElMessage({
          message: ''
        })
        getList()
      }
      dialogVisible.value = false
    }).finally(() => {
      saveLoading.value = false
    })
  }
}

// 删除菜单
const delMenu = async (row: any) => {
  delMenuApi(row.id).then(res => {
    if (res.code == 200) {
      ElMessage({
          message: res.msg
        })
      getList()
    }
  })
}
</script>

<template>
  <ContentWrap>
    <Search :schema="searchSchema" @reset="setSearchParams" @search="setSearchParams" />
    <div class="mb-10px">
      <BaseButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</BaseButton>
    </div>
    <Table
      :columns="tableColumns"
      default-expand-all
      node-key="id"
      :data="dataList"
      :loading="loading"
      @register="tableRegister"
    />
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write v-if="actionType !== 'detail'" ref="writeRef" :current-row="currentRow" />

    <Detail v-if="actionType === 'detail'" :current-row="currentRow" />

    <template #footer>
      <BaseButton
        v-if="actionType !== 'detail'"
        type="primary"
        :loading="saveLoading"
        @click="save"
      >
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
</template>
