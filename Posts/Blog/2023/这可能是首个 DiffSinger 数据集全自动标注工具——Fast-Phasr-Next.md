---
title: 这可能是首个 DiffSinger 数据集全自动标注工具——Fast-Phasr-Next
tags:
  - DiffSinger
  - 自动标注
  - AI
cover: https://img-r2.yumetsuki.moe/q78kg/99654366_p0.webp
categories: 技术分享
date: 2023-09-29 00:00:00
abbrlink: de1f83f4
---

## 引言

DiffSinger 是一种基于神经网络的歌声合成系统，它可以根据给定的歌词和旋律生成高质量的歌声。然而，DiffSinger 的训练过程也面临着一些挑战，其中之一就是它需要一个大规模且高质量的歌声数据集来训练。为了制作一个适合 DiffSinger 的数据集，声库开发者需要对每个音频片段进行音素持续时间标注，这是一个非常耗时和繁琐的过程。

因此，我们开发了一个自动标注工具，名为 Fast-Phasr-Next，它可以快速地生成 DiffSinger 所需的标注信息，从而简化了数据集的制作过程。本文将介绍我们的工具的设计思路，主要功能，技术细节，以及使用方法。需要注意的是，目前该工具目前**支持中文、英文和日语**（但日语识别的可靠性不高）。

## 开发思路

在开发时，我们借鉴了 Fast-Phasr，也就是第一代自动标注工具的开发者 Infinity-INF 的设计思路，使用了 AI 来检测数据音频中的人声，不过初代工具所转换出来的.lab 文件中的音素是散乱的，需要重新整合，这使得下一步的开发难上加难。

第一代不同的是，我们使用了 OpenAI 的语音识别项目 openai-whisper，它可以将输入的语音通过模型精准的转换为文字。当音频转换为文字后，困难便会迎刃而解，在此，我们使用 pypinyin 来处理转换出的文字，这样输出的就是符合 DiffSinger 数据集标准的标注了。

## 使用

目前 Fast-Phasr-Next 支持 openai-whisper 的几个模型

|  Size  | Parameters | English-only model | Multilingual model | Required VRAM | Relative speed |
| :----: | :--------: | :----------------: | :----------------: | :-----------: | :------------: |
|  tiny  |    39 M    |     `tiny.en`      |       `tiny`       |     ~1 GB     |      ~32x      |
|  base  |    74 M    |     `base.en`      |       `base`       |     ~1 GB     |      ~16x      |
| small  |   244 M    |     `small.en`     |      `small`       |     ~2 GB     |      ~6x       |
| medium |   769 M    |    `medium.en`     |      `medium`      |     ~5 GB     |      ~2x       |
| large  |   1550 M   |        N/A         |      `large`       |    ~10 GB     |       1x       |

其中 base 和 small 模型已经能满足大部分的需要，更大的模型会减缓标注的速度，如非必要无需选择更大的模型。

使用项目先 clone 仓库到任意文件夹

```
git clone https://github.com/Anjiurine/fast-phasr-next.git
```

随后创建一个 conda 虚拟环境

```
conda create -n fast-phasr-next python=3.11 -y
conda activate fast-phasr-next
```

随后安装依赖，需要注意的是，使用 gpu 的用户需要先安装 cuda 版本的 torch，否则在 openai-whisper 安装时会自动安装 cpu-only 版本的 torch，这样在使用时会对推理速度造成影响。

```
# cpu
pip install -r requirement.txt

# gpu
conda install cudatoolkit -y
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

pip install -r requirement.txt
```

在安装好依赖后就可以开始推理啦

```
python main.py -d [import directory] -m [model default="base"] -l [language default="Chinese"]
```

**ps:程序永远存在不确定性，请不要 100%相信自动程序（即使程序有很高的可靠性），如果是重大项目请在使用该程序后对音素序列进行必要的检查**
